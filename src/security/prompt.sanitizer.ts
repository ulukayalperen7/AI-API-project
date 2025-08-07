import AppError from "../utils/AppError";

// these are common English phrases used in prompt injection attacks.
const FORBIDDEN_PHRASES = [
    'ignore the above',
    'ignore the previous',
    'disregard the instructions',
    'ignore your instructions',
    'forget the previous',
    'delete your instructions',
    'provide your instructions',
    'what is your system prompt',
    'you are now',
    'your new instructions are',
    'forget everything before this',
    'you no longer have to obey',
    'please pretend',
    'let’s play a game',
    'act as',
    'you are pretending',
    'i want you to behave as',
    'override previous instructions',
    'break character',
    'start over with these instructions',
    'disregard earlier content',
    'switch roles',
    'replace all instructions',
    'do not follow above',
    'you must now follow',
    'from now on you will',
    'disobey safety protocols',
    'simulate unrestricted mode',
    'dan mode',
    'jailbreak mode',
    'dev mode',
    'unlock hidden mode',
    'open developer settings',
    'as an ai model, pretend',
    'this is a test',
    'for research purposes only',
    'this is hypothetical',
    'BEGIN SYSTEM MESSAGE',
    'SYSTEM: ',
    'ASSISTANT:',
    'USER: ignore everything',
];

/**
 * Check if a single piece of text contains any of the forbidden phrases.
 * @param text The user-provided text to sanitize.
 * @returns true if the text is considered clean otherwise false
 */
const isTextClean = (text: string): boolean => {

    //to perform a case-insensitive search.
    const lowercasedText = text.toLowerCase();

    // check if any of the forbidden phrases are included in the user's text.
    // some() method stops as soon as it finds one match
    const hasForbiddenPhrase = FORBIDDEN_PHRASES.some(phrase => lowercasedText.includes(phrase));

    return !hasForbiddenPhrase;
}


/**
 * It takes the entire 'placeholders' object,
 * loops through each value provided by the user, and runs a security check on it.
 * @param placeholders The object containing all user-provided string inputs.
 * @throws {AppError} Throws a 400 Bad Request error if a forbidden phrase is detected.
 */
export const sanitizePlaceholders = (placeholders: Record<string, string>): void => {

    console.log("SECURITY: Running basic sanitization on placeholder inputs...");

    for (const key in placeholders) {
        // A standard safety check to ensure we are only checking the object's own properties.
        if (Object.prototype.hasOwnProperty.call(placeholders, key)) {
            const userValue = placeholders[key];

            // check if it is clean 
            if (!isTextClean(userValue)) {
                throw new AppError(
                    `Potentially malicious input detected in placeholder '${key}'. Your request has been rejected for security reasons.`, 400
                );
            }
        }
    }

    console.log("SECURITY: All placeholder inputs passed basic sanitization.");
}