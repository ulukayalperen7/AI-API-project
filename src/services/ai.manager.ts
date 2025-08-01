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
     * @returns a promise that resolves to the string response from the AI
     */
    generateContent(promt: string): Promise<string>;
}

/**
 * This is our list of available specialists.
 * The key is the model name, and the value is the service object that does the work.
 * The 'Record<string, AIProvider>' type ensures all values follow the AIProvider rules.
 */
const providers: Record<string, AIProvider> = {
    'gemini-1.5-flash': geminiService,
    //'gpt-4': OpenAIService ... future expansion example
}

export const generateContentByModel = async (modelName: string, prompt: string): Promise<string> => {

    // Look at the model list in our providers list 
    const provider = providers[modelName];

    if (!provider) {
        throw new Error(`Model '${modelName}' is not supported or not registered in ai.manager.`);
    }

    console.log(`AI MANAGER: Routing prompt to provider for model: ${modelName}`);

    // 3. If found, call its 'generateContent' method.
    return provider.generateContent(prompt);
};