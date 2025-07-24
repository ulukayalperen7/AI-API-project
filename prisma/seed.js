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

async function main() {

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
            system_prompt: 'You are a professional editor. \n Analyze the following text and provide a concise summary. The summary should capture the main points and be easy to understand. Do not add any extra commentary. The text to summarize is: {{text_to_process}}',
            default_model: 'openai-gpt-3.5-turbo',
            allowed_models: ['openai-gpt-3.5-turbo', 'openai-gpt-4'], // stored as a JSON array
            placeholders: ['text_to_process'], // JSON array
        },
    });

    console.log(`Successfully created template with ID: ${summarizationTemplate.id}`);
    console.log('Seeding process finished!');
}

// if any potential error occurs 
main().catch((e) => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    // This block will always run, whether the script succeeds or fails
    // it is crucial to disconnect from the db to prevent memory leaks
    await prisma.$disconnect();
})