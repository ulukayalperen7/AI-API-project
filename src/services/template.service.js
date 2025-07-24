import prisma from '../config/prismaClient.js';


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

    // we will come back here 


    return template;
}