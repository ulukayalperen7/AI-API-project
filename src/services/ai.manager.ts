import AppError from "../utils/AppError";
import geminiService from "./gemini.service";
/**
 * This interface defines the contract that all AI provider services must follow.
 * Like a blueprint for what an AI provider is in our system.
 */
export interface AIProvider {

    /**
     * It takes a text prompt and returns the AI-generated content
     * Each AI service(gemini,openai) must have this exact method.
     * @param promt  the final text prompt to be sent to the AI
     * @param modelName specific model name
     * @returns a promise that resolves to the string response from the AI
     */
    generateContent(promt: string, modelName: string): Promise<string>;
}

/**
 * This is our list of available specialists.
 * The key is the model name, and the value is the service object that does the work.
 * The 'Record<string, AIProvider>' type ensures all values follow the AIProvider rules.
 */
const providers: Record<string, AIProvider> = {
    'gemini-1.5-flash': geminiService,
    //'gpt-4': OpenAIService 
}

export const generateContentByModel = async (modelName: string, prompt: string): Promise<string> => {

    // Look at the model list in our providers list 
    const provider = providers[modelName];

    if (!provider) {
       throw new AppError(`No provider found for model family: '${modelName}'. Check ai.manager.ts configuration.`, 400);
    }

    console.log(`AI MANAGER: Routing prompt to provider for model: ${modelName}`);

    // 3. If found, call its 'generateContent' method.
    return provider.generateContent(prompt, modelName);
};