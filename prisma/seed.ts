/**
 * Only runs when you write 'npx prisma db seed'.
 * It establishes and closes its db connection.
 * It is a one-time, standalone program.
 *
 */

// PrismaClient allows us to talk to the db
import { PrismaClient } from "@prisma/client";

// we us this object to reach db
const prisma = new PrismaClient();

// The function is explicitly declared to return a Promise<void>
// as it is an async function that does not return a value.
async function main(): Promise<void> {

    console.log("Starting the seeding process...")

    /**
     * `.create({ ... })`:  we say that we want to insert a new line to the db.
     * `await` : wait until this process is completed.
     * `data: { ... }` : tells the create method which values the new row will be created with.
     * Each key here (name, description, etc) corresponds to a column we defined for
     * the 'Template' model in our schema.prisma file.
     */
    // id 1
    const summarizationTemplate = await prisma.template.create({
        data: {
            name: 'Standard Text Summarization',
            description: 'Summarizes a given block of text into a concise paragraph.',
            system_prompt: 'You are a professional editor. \n Analyze the following text and provide a concise summary in {{language}}. The summary should capture the main points and be easy to understand. Do not add any extra commentary. The text to summarize is: {{text_to_process}}',
            default_model: 'gemini-1.5-flash',// if user doesnt choose any model
            // Prisma expects Json fields to be valid JSON, arrays are valid.
            allowed_models: [
                'gpt-4o',
                'gpt-4',
                'gpt-4-32k',
                'gpt-3.5-turbo',
                'gpt-3.5-turbo-16k',
                'gemini-1.5-flash',
                'gemini-1.5-pro',
                'gemini-1.0-pro',
                'gemini-1.0-pro-vision'
            ],
            placeholders: ['text_to_process', 'language'],
        },
    });

    // keywordExtraction feature: just add template, we dont change anything , thats it 
    // id 2
    const keywordExtractionTemplate = await prisma.template.create({
        data: {
            name: 'Keyword Extractor',
            description: 'Extracts key topics and terms from a block of text.',
            system_prompt: "You are a text analysis expert. Analyze the following text and extract the most relevant and important keywords. List them as a comma-separated list. For example: 'AI, machine learning, data science'. The text to analyze is: {{text_to_process}}",
            default_model: 'gemini-1.5-flash',
            allowed_models: [
                'gpt-4o',
                'gpt-4',
                'gpt-4-32k',
                'gpt-3.5-turbo',
                'gpt-3.5-turbo-16k',
                'gemini-1.5-flash',
                'gemini-1.5-pro',
                'gemini-1.0-pro',
                'gemini-1.0-pro-vision'
            ],
            placeholders: ['text_to_process'],
        },
    });

    // Translation template
    // id 3
    const translationTemplate = await prisma.template.create({
        data: {
            name: 'Text Translator',
            description: 'Translates text from a source language to a target language.',
            system_prompt: "You are an expert multilingual translator. Your task is to translate the following text accurately from {{source_language}} to {{target_language}}. Provide only the translated text, without any additional comments, explanations, or quotation marks. The text to translate is: {{text_to_process}}",
            default_model: 'gpt-4o',
           allowed_models: [
                'gpt-4o',
                'gpt-4',
                'gpt-4-32k',
                'gpt-3.5-turbo',
                'gpt-3.5-turbo-16k',
                'gemini-1.5-flash',
                'gemini-1.5-pro',
                'gemini-1.0-pro',
                'gemini-1.0-pro-vision'
            ],
            // this tempalte needs these fields to accurately translate the text
            placeholders: ['text_to_process', 'source_language', 'target_language'],
        },
    });


    // email template 
    /**
         * --- FUTURE UI OPTIONS FOR: Email Reply Assistant ---
         * In a future web application, the user wouldn't type the 'response_intent'.
         * Instead, they would click on predefined buttons or select from a dropdown menu.
         * These options would then send the corresponding 'response_intent' text to the API.
         *
         * Example UI Options:
         * - [ Accept & Ask for Details ] -> "Accept the proposal and ask for more details about the timeline."
         * - [ Decline Politely ] -> "Politely decline the offer, stating that it's not a good fit at the moment."
         * - [ Suggest a Meeting ] -> "Suggest a 30-minute video call to discuss this further and ask for their availability."
         * - [ Express Interest ] -> "Express strong interest and say that you will get back to them within 24 hours."
         * - [ Request Clarification ] -> "Ask for clarification on specific points mentioned in the email."
         */
    // id 4
    const emailAssistantTemplate = await prisma.template.create({
        data: {
            name: 'Email Reply Assistant',
            description: 'Drafts a professional email reply based on an original email and a desired intent.',
            system_prompt: "You are a highly efficient and professional business email assistant. Your task is to draft a reply to the email provided below. The reply must be based on the user's stated intent. Write the email in a natural and polite tone, appropriate for a business context, and make sure to draft it in {{language}}. Do not add any extra commentary or signatures, just provide the body of the reply email. --- ORIGINAL EMAIL TO REPLY TO: --- {{original_email}} --- USER'S INTENT FOR THE REPLY: --- {{response_intent}}",
            default_model: 'gemini-1.5-flash',
           allowed_models: [
                'gpt-4o',
                'gpt-4',
                'gpt-4-32k',
                'gpt-3.5-turbo',
                'gpt-3.5-turbo-16k',
                'gemini-1.5-flash',
                'gemini-1.5-pro',
                'gemini-1.0-pro',
                'gemini-1.0-pro-vision'
            ],
            placeholders: ['original_email', 'response_intent', 'language'],
        },
    });


    /**
    * --- FUTURE UI OPTIONS FOR: Text Refiner ---
    * The 'target_style' for this template is incredibly flexible.
    * In a user interface, we can provide a set of powerful one-click refinement options.
    *
    * Example UI Options:
    * - [ Make it Professional ] -> "Rewrite this text in a formal, professional, and corporate tone."
    * - [ Make it Casual ] -> "Rewrite this text in a more casual, friendly, and approachable tone."
    * - [ Simplify Language ] -> "Simplify this text so that a 10th grader can easily understand it. Remove all jargon."
    * - [ Make it More Assertive ] -> "Make the language more confident and assertive, using active voice."
    * - [ Shorten (Tweet-style) ] -> "Condense this text into a short, impactful version under 280 characters, suitable for Twitter."
    * - [ Expand (Elaborate) ] -> "Expand on this point, adding more detail and providing examples to make it a full paragraph."
    */
    // id 5
    const textRefinementTemplate = await prisma.template.create({
        data: {
            name: 'Text Refiner',
            description: 'Rewrites a given text to a specified style or tone (e.g., more professional, more casual).',
            system_prompt: "You are a skilled editor and writing assistant. Your task is to rewrite the following text according to the specified target style. Ensure the core message of the text remains the same, but adapt the tone, clarity, and phrasing to match the requested style. Provide only the rewritten text. --- ORIGINAL TEXT: --- {{text_to_process}} --- TARGET STYLE: --- {{target_style}}",
            default_model: 'gemini-1.5-flash',
           allowed_models: [
                'gpt-4o',
                'gpt-4',
                'gpt-4-32k',
                'gpt-3.5-turbo',
                'gpt-3.5-turbo-16k',
                'gemini-1.5-flash',
                'gemini-1.5-pro',
                'gemini-1.0-pro',
                'gemini-1.0-pro-vision'
            ],
            placeholders: ['text_to_process', 'target_style'],
        },
    });

    console.log(`Successfully created Summarization template with ID: ${summarizationTemplate.id}`);
    console.log(`Successfully created Keyword Extraction template with ID: ${keywordExtractionTemplate.id}`);
    console.log(`Successfully created Translation template with ID: ${translationTemplate.id}`);
    console.log(`Successfully created Email assistant template with ID: ${emailAssistantTemplate.id}`);
    console.log(`Successfully created Text refinement template with ID: ${textRefinementTemplate.id}`);
    console.log('Seeding process finished!');
}

// if any potential error occurs
// The error 'e' is typed as 'any' or 'Error' for safer handling.
main().catch((e: Error) => {
    console.error(e); // Using console.error for errors is a good practice.
    process.exit(1);
}).finally(async () => {
    // This block will always run, whether the script succeeds or fails
    // it is crucial to disconnect from the db to prevent memory leaks
    await prisma.$disconnect();
})