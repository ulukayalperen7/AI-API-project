// Imports the necessary types from the Express framework for type safety.
import { Request, Response } from 'express';

// The '.js' extension is removed as TypeScript handles module resolution.
import * as TemplateService from '../services/template.service';

/**
 * This function executes a specific AI template based on the provided ID
 * It manages the entire process:
 * 1 - fetches id from the URL
 * 2 - retrieves the request body (for example : text to process)
 * 3 - it will call the service layer for the main logic
 * 4 - finally, sends a response back to the client
 * @param {object} req - The Express request object
 * @param {object} res - The Express response object
 */
// This function is defined as asynchronous to use the 'await' keyword.
// The 'req' and 'res' parameters are typed with 'Request' and 'Response' for autocompletion and error checking.
export const executeTemplate = async (req: Request, res: Response) => {
    try {
        /**
         * This is how we access the dynamic :id
         * parameter from the URL we defined in our router
         */
        const { id } = req.params;

        /**
         * The data in JSON format sent by the user
         * is carried in the body of the request.
         * The middleware app.use(express.json());
         * that we wrote in the server.js file reads this incoming
         * JSON data, converts it to a JavaScript object,
         * and places it in req.body. This line gives us access to that data.
         */
        const requestBody = req.body;

        // This line calls the 'execute' function from the service layer,
        // passing the id and request body to it and waiting for the result.
        const result = await TemplateService.execute(id, requestBody);

        console.log('CONTROLLER RECEIVED:', result);
        // This sends a successful HTTP 200 response back to the client in JSON format.
        res.status(200).json({
            message: 'Template executed successfully',
            data: result,
        });

    } catch (error) {
        // This block catches any errors that occur in the 'try' block.
        // It checks if the caught 'error' is an instance of the standard Error class to safely access its properties.
        if (error instanceof Error) {
            console.error('CONTROLLER ERROR: ', error.message);

            // more specific error for "Not Found"
            if (error.message.includes('not found')) {
                // This returns a 404 Not Found error if the template doesn't exist.
                return res.status(404).json({ message: error.message });
            }

            // This returns a generic 500 Internal Server Error for all other errors.
            res.status(500).json({
                message: 'An internal server error occurred.',
                error: error.message,
            });
        } else {
            // This handles cases where the thrown object is not a standard error.
            res.status(500).json({
                message: 'An unknown internal server error occurred.',
            });
        }
    }
};