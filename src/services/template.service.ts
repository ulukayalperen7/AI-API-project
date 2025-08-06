// The 'Template' type is imported from the auto-generated Prisma client.
// This allows TypeScript to understand the exact shape of a template object from the database.
import { Template } from '@prisma/client';
import prisma from '../config/prismaClient';
import { generateContentByModel } from './ai.manager';

// This interface defines the expected structure of the object returned by the 'execute' function.
// It ensures that any function calling 'execute' knows to expect these specific properties.
interface ExecuteResponse {
    ai_response: string;
    template_used: string;
}

// This interface defines the expected structure of the request body.
// It requires a 'placeholders' property which is an object with string keys and string values.
interface ExecuteRequestBody {
    placeholders: Record<string, string>;
}

// This is a utility function to replace placeholders in a text.
// The parameters 'text' and 'placeholders' are typed for safety.
// The function is declared to return a 'string'.
const preparePrompt = (text: string, placeholders: Record<string, string>): string => {
    let preparedText = text;
    for (const key in placeholders) {
        // This ensures the loop only processes the object's own properties.
        if (Object.prototype.hasOwnProperty.call(placeholders, key)) {
            const regex = new RegExp(`{{${key}}}`, `g`);
            preparedText = preparedText.replace(regex, placeholders[key]);
        }
    }
    return preparedText;
};

/**
 * This method finds a template by its ID in the db.
 * this is the very first step in executing a template
 * @param {string} templateId  - id of the template to find it.
 * @returns {Promise<object|null>} - returns template object from db;
 * if not found return null
 */
// The function's return type is a 'Promise' that resolves to either a 'Template' object or 'null'.
const findTemplateById = async (templateId: string): Promise<Template | null> => {

    // checks if the string contains ONLY digits 
    // from start (^) to end ($).
    const isNumericRegex = /^\d+$/;

    // We first test if the entire string is numeric.
    if (!isNumericRegex.test(templateId)) {
        const error = new Error('Invalid template ID format. ID must consist of only numbers.');
        (error as any).statusCode = 400; // bad request
        throw error;
    }

    // Only if the string is purely numeric, we parse it.
    const idNumber = parseInt(templateId, 10);

    // this is extra control layer
    // This check validates that the conversion to a number was successful.
    if (isNaN(idNumber)) {
        const error = new Error('Failed to parse the numeric ID.');
        (error as any).statusCode = 500; // This should ideally never happen
        throw error;
    }//????????

    console.log(`SERVICE: Searching for template with ID: ${idNumber}`);

    /**
     * Prisma client to find the template in the template table
     */
    // Because Prisma is typed, it knows 'findUnique' will return 'Template | null'.
    const template = await prisma.template.findUnique({
        where: {
            id: idNumber,
        },
    });

    return template;
};

/**
 * This is the main service func to execute a template
 * @param {*} templateId
 * @param {*} requestBody - The body of the request from the client
 * @returns  template
 */
// This function is the main exported function of the service.
// It is typed to receive a 'string' and an 'ExecuteRequestBody', and returns a 'Promise<ExecuteResponse>'.
export const execute = async (templateId: string, requestBody: ExecuteRequestBody): Promise<ExecuteResponse> => {

    // find the template in db
    const template = await findTemplateById(templateId);

    // if the template doesnt exist
    // This 'if' check also acts as a type guard. After this, TypeScript knows 'template' cannot be null.
    if (!template) {
        // 1. Create a standard Error object
        const error = new Error(`Template with ID: ${templateId} not found.`);

        // not found
        (error as any).statusCode = 404;
        throw error;
    }
    console.log('SERVICE: Template found: ', template.name);

    // create the final prompt by replacing placeholders
    // The 'template.system_prompt' and 'requestBody.placeholders' properties are accessed safely.
    const finalPrompt = preparePrompt(template.system_prompt, requestBody.placeholders);

    console.log('SERVICE: Final prompt prepared.');

    // This service(template.service.ts) no longer knows or cares about "Gemini".
    const modelToUse = template.default_model;

    console.log(`SERVICE: Handing off to AI Manager with model: ${modelToUse}`);


    const responseOfAI = await generateContentByModel(modelToUse, finalPrompt)
    console.log('SERVICE: Received response back from AI Manager.');

    // we will later log the request tp apilogs table

    console.log('SERVICE IS ABOUT TO RETURN: ', {
        ai_response: responseOfAI,
        template_used: template.name,
    });
    /**
     * Instead of just returning the template, we now return a structured object containing the actual ai_response
     */
    // The returned object matches the 'ExecuteResponse' interface, ensuring consistency.
    return {
        ai_response: responseOfAI,
        template_used: template.name,
    };
};

/* This service doesnt know the existing of Gemini or openAI or etc.
It only knows the ai.manager as responsible of these ai services.

loosely coupled and dependency inversion principle we template_used
high cohesion: each module does its job and only does one job*/