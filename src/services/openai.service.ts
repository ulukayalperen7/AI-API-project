import OpenAI from 'openai';
import { AIProvider } from './ai.manager';
import AppError from '../utils/AppError';


class OpenAIService implements AIProvider {

    // an instance of the OpenAI client.
    private readonly openai: OpenAI;

    /**
     * The constructor runs ONCE when the service is first initialized.
     *  used to set up the connection and configuration for the OpenAI client.
     */
    constructor() {
        console.log("Initializing OpenAI Service...");
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new AppError("OPENAI_API_KEY is not defined in the environment variables.", 500);
        }

        // Creates a new instance of the OpenAI client with the provided API key.
        this.openai = new OpenAI({ apiKey: apiKey });
        console.log("OpenAI Service initialized successfully.");
    };

    /**
     * The implementation of the method required by the AIProvider interface.
     *  calls the OpenAI API.
     * @param prompt The final, ready-to-use prompt text.
     * @param modelName The specific OpenAI model to use for this request (e.g., 'gpt-4o').
     * @returns A Promise that resolves to the AI-generated text as a string.
     */
    async generateContent(prompt: string, modelName: string): Promise<string> {

        try {
            console.log(`OPENAI SERVICE: Generating content with model: ${modelName}`);

            // This is the specific method from the 'openai' library to generate a chat-based response.
            const response = await this.openai.chat.completions.create({
                model: modelName,
                messages: [{ role: "user", content: prompt }],
            });

            const text = response.choices[0].message.content;

            if (!text) {
                throw new AppError("OpenAI returned an empty response.", 500);
            }

            console.log('OPENAI SERVICE: Received valid response.');
            return text;

        } catch (error) {

            console.error('Error in OpenAI Service: ', error);

            let statusCode = 502;

            // type guard
            if (typeof error === 'object' && error !== null && 'status' in error) {
                const potentialStatus = (error as { status: unknown }).status;
                if (typeof potentialStatus === 'number') {
                    statusCode = potentialStatus;
                }
            }

            throw new AppError('Failed to generate content from the external AI provider (OpenAI).', statusCode);
        }
    }
}
export default new OpenAIService();
