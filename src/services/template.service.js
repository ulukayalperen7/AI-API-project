import prisma from '../config/prismaClient.js';
import { generateGeminiContent } from './gemini.service.js';

const preparePrompt = (text, placeholders) => {
    let preparedText = text;
    for (const key in placeholders) {
        const regex = new RegExp(`{{${key}}}`, `g`);
        preparedText = preparedText.replace(regex, placeholders[key]);
    }
    return preparedText;
}

/**
 * This method finds a template by its ID in the db.
 * this is the very first step in executing a template
 * @param {string} templateId  - id of the template to find it.
 * @returns {Promise<object|null>} - returns template object from db;
 * if not found return null
 */
const findTemplateById = async (templateId) => {

    /**
     * prisma gets the ID as a number
     * 10 is the base of the number in string
     */
    const idNumber = parseInt(templateId, 10);

    if (isNaN(idNumber)) {
        throw new Error('Invalid template ID format. ID must be a number.');
    }

    console.log(`SERVICE: Searching for template with ID: ${idNumber}`);

    /**
     * Prisma client to find the template in the template table 
     */
    const template = await prisma.template.findUnique({
        where: {
            id: idNumber,
        },
    });

    return template;
}

/**
 * This is the main service func to execute a template
 * @param {*} templateId 
 * @param {*} requestBody - The body of the request from the client 
 * @returns  template 
 */
export const execute = async (templateId, requestBody) => {

    // find the template in db
    const template = await findTemplateById(templateId);

    // if the template doesnt exist
    if (!template) {
        throw new Error(`Template with ID: ${templateId} not found.`);
    }
    console.log('SERVICE: Template found: ', template.name);

    // create the final prompt by replacing placeholders
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
    return {
        ai_response: responseOfAI,
        template_used: template.name,
    };
};