// This file is the SINGLE SOURCE OF TRUTH for all AI models supported by our application.

export const AI_PROVIDERS = {
    GOOGLE: 'google',
    OPENAI: 'openai',
    // ANTHROPIC: 'anthropic', // Future provider
} as const; // 'as const' makes this object readonly and its values literal types.

export const SUPPORTED_MODELS = {
    // Google Models
    'gemini-1.5-flash': { provider: AI_PROVIDERS.GOOGLE },
    'gemini-1.5-pro': { provider: AI_PROVIDERS.GOOGLE },
    'gemini-1.0-pro': { provider: AI_PROVIDERS.GOOGLE },
    'gemini-1.0-pro-vision': { provider: AI_PROVIDERS.GOOGLE },

    // OpenAI Models
    'gpt-4o': { provider: AI_PROVIDERS.OPENAI },
    'gpt-4': { provider: AI_PROVIDERS.OPENAI },
    'gpt-4-32k': { provider: AI_PROVIDERS.OPENAI },
    'gpt-3.5-turbo': { provider: AI_PROVIDERS.OPENAI },
    'gpt-3.5-turbo-16k': { provider: AI_PROVIDERS.OPENAI },

    // Anthropic Models (later)
    // 'claude-3-opus': { provider: AI_PROVIDERS.ANTHROPIC },
} as const;

/*
 We create a simple array of model names from the object keys above.
 This will be useful for validation and for the frontend to list available models.
 */
export const SUPPORTED_MODEL_NAMES = Object.keys(SUPPORTED_MODELS);