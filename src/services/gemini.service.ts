import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { AIProvider } from "./ai.manager";
import AppError from "../utils/AppError";

/**
 * self contained Gemini service class
 * implemets AIProvider interface.
 * generateContent method returns a promise to follow all rules
 */
class GeminiService implements AIProvider {

    private readonly googleAI: GoogleGenerativeAI;

    constructor() {
        console.log("Initializing Gemini service...");

        // getting the API key from env
        const apiKey = process.env.GEMINI_API_KEY;

        // check if the apiKey exists
        if (!apiKey) {
            throw new AppError("GEMINI_API_KEY is not defined in the environment variables. The server is not configured correctly.", 500);
        }

        this.googleAI = new GoogleGenerativeAI(apiKey);

        console.log("Gemini Service initialized successfully.");
    }

    /**
     * generates content using Gemini AI
     * last step to interact with the AI
     * @param promt  the final, clean, complete prompt to be send to the AI
     * @param modelName 
     * @returns 
     */
    async generateContent(promt: string, modelName: string): Promise<string> {

        /*
          It takes a text prompt, sends it to the Gemini API using model.generateContent(prompt),
          waits for the result, and returns the generated text. */
        try {
            console.log(`GEMINI SERVICE: Generating content with model: ${modelName}`);

            // The 'await' keyword pauses execution until the 'generateContent' promise settles.

            // dynamically within the method using the provided modelName
            const model: GenerativeModel = this.googleAI.getGenerativeModel({ model: modelName });
            //                this generateContent method is from googleAI object, not our method 
            const result = await model.generateContent(promt);

            // we get the response from the result that is created in generateContent method
            const response = await result.response;

            // The 'text()' method also returns a promise, so it must be awaited.
            const text = await response.text();

            console.log('GEMINI SERVICE: received valid response.')
            return text;

            //In the catch (error) statement in a try...catch block, the type of the error is unknown by default, according to TypeScript's latest, strictest rules.
        } catch (error) {

            console.log('Error in Gemini Service: ', error);
            let statusCode = 502; // Default to 502 Bad Gateway for upstream errors.

            // We check if the caught error object contains a 'status' property.
            if (typeof error === 'object' && error !== null && 'status' in error) {
                const potentialStatus = (error as { status: unknown }).status;
                if (typeof potentialStatus === 'number') {
                    statusCode = potentialStatus;
                }
            }

            throw new AppError(`Failed to generate content from Gemini model: ${modelName}`, statusCode);
        }
    }
}

// We create ONE single, shared instance of our GeminiService...
// ...and export it as the default export.
// Anyone who imports this file will get this specific object.
export default new GeminiService();