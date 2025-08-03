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
    const summarizationTemplate = await prisma.template.create({
        data: {
            name: 'Standard Text Summarization',
            description: 'Summarizes a given block of text into a concise paragraph.',
            system_prompt: 'You are a professional editor. \n Analyze the following text and provide a concise summary in {{language}}. The summary should capture the main points and be easy to understand. Do not add any extra commentary. The text to summarize is: {{text_to_process}}',
            default_model: 'gemini-1.5-flash',
            // Prisma expects Json fields to be valid JSON, arrays are valid.
            allowed_models: ['gemini-1.5-pro-latest', 'gemini-1.0-pro', 'gemini-pro', 'gemini-1.5-flash'],
            placeholders: ['text_to_process', 'language'],
        },
    });

    // keywordExtraction feature: just add template, we dont change anything , thats it 
    const keywordExtractionTemplate = await prisma.template.create({
        data: {
            name: 'Keyword Extractor',
            description: 'Extracts key topics and terms from a block of text.',
            system_prompt: "You are a text analysis expert. Analyze the following text and extract the most relevant and important keywords. List them as a comma-separated list. For example: 'AI, machine learning, data science'. The text to analyze is: {{text_to_process}}",
            default_model: 'gemini-1.5-flash',
            allowed_models: ['gemini-1.5-pro-latest', 'gemini-1.0-pro', 'gemini-pro', 'gemini-1.5-flash'],
            placeholders: ['text_to_process'],
        },
    });

    console.log(`Successfully created template with ID: ${summarizationTemplate.id}`);
    console.log(`Successfully created template with ID: ${keywordExtractionTemplate.id}`);
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