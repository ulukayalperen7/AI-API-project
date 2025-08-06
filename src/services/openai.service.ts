import OpenAI from 'openai';
import { AIProvider } from './ai.manager';
import AppError from '../utils/AppError';


class OpenAIService implements AIProvider {

    private readonly openai: OpenAI;

    constructor() {
        console.log("Initializing OpenAI Service...");
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new AppError("OPENAI_API_KEY is not defined in the environment variables.", 500);
        }

        this.openai = new OpenAI({ apiKey: apiKey });
        console.log("OpenAI Service initialized successfully.");
    };

    async generateContent(prompt: string, modelName: string): Promise<string> {

        try {
            console.log(`OPENAI SERVICE: Generating content with model: ${modelName}`);

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
