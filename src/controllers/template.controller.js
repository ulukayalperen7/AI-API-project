import * as TemplatService from '../services/template.service.js';
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
export const executeTemplate = async (req, res) => {
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

        // send id and requestBody to service layer 
        const result = await TemplatService.execute(id, requestBody);

        console.log('CONTROLLER RECEIVED:', result); 
        // send a success response back to the client
        res.status(200).json({
            message: 'Template executed successfully',
            data: result,
        });

    } catch (error) {

        console.error('CONTROLLER ERROR: ', error.message);

        // more specific error for "Not Found"
        if (error.message.includes('not found')) {
            return res.status(404).json({ message: error.message });
        }


        res.status(500).json({
            message: 'An internal server error occurred.',
            error: error.message,
        });
    }
}