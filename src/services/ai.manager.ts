import { AI_PROVIDERS, SUPPORTED_MODELS } from "../config/ai-models.config";
import AppError from "../utils/AppError";
import GeminiService from "./gemini.service";
import OpenAIService from "./openai.service"
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

const providerInstances: Record<string, AIProvider> = {
    [AI_PROVIDERS.GOOGLE]: GeminiService,
    [AI_PROVIDERS.OPENAI]: OpenAIService,
    // [AI_PROVIDERS.ANTHROPIC]: AnthropicService,
};

export const generateContentByModel = async (modelName: string, prompt: string): Promise<string> => {

    // We check if the incoming model name is supported
    const modelInfo = SUPPORTED_MODELS[modelName as keyof typeof SUPPORTED_MODELS];

    if (!modelInfo) {
        throw new AppError(`Model '${modelName}' is not supported by the system.`, 400);
    }

    // which brand to use google? openai? etc...
    const providerName = modelInfo.provider;

    // find the exact model from the list above 
    const providerInstance = providerInstances[providerName];

    if (!providerInstance) {
        throw new AppError(`No service provider configured for '${providerName}'.`, 500);
    }

    console.log(`AI MANAGER: Routing to '${providerName}' provider for model: ${modelName}`);


    //If found, call its 'generateContent' method.
    return  providerInstance.generateContent(prompt, modelName);
};