import { generateGeminiContent } from './gemini.service.js';
import prisma from '../config/prismaClient.js';
// This is a utility function to replace placeholders in a text.
// The parameters 'text' and 'placeholders' are typed for safety.
// The function is declared to return a 'string'.
const preparePrompt = (text, placeholders) => {
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
const findTemplateById = async (templateId) => {
    /**
     * prisma gets the ID as a number
     * 10 is the base of the number in string
     */
    const idNumber = parseInt(templateId, 10);
    // This check validates that the conversion to a number was successful.
    if (isNaN(idNumber)) {
        throw new Error('Invalid template ID format. ID must be a number.');
    }
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
export const execute = async (templateId, requestBody) => {
    // find the template in db
    const template = await findTemplateById(templateId);
    // if the template doesnt exist
    // This 'if' check also acts as a type guard. After this, TypeScript knows 'template' cannot be null.
    if (!template) {
        throw new Error(`Template with ID: ${templateId} not found.`);
    }
    console.log('SERVICE: Template found: ', template.name);
    // create the final prompt by replacing placeholders
    // The 'template.system_prompt' and 'requestBody.placeholders' properties are accessed safely.
    const finalPrompt = preparePrompt(template.system_prompt, requestBody.placeholders);
    console.log('SERVICE: Final prompt prepared.');
    console.log('SERVICE: Sending prompt to Gemini...');
    // call the AI service with the final prompt
    // the crucial line where we pass control to our Gemini service and wait for the AI's response
    const responseOfAI = await generateGeminiContent(finalPrompt);
    console.log('SERVICE: Received response from Gemini.');
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
//# sourceMappingURL=template.service.js.map