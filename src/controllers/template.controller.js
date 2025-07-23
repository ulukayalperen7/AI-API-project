
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

        //  for now : to confirm it works
        console.log(`Executing template with id : ${id}`);
        console.log(`Request Body:`, requestBody);

        // send a success response back to the client
        res.status(200).json({
            messsage: `Successfully received request for template ID: ${id}`,
            data_received: requestBody,
        });

    } catch (error) {
        // if an error occurs, send a server error response
        console.error('Error executing template:', error);
        res.status(500).json({
            message: 'An internal server error occurred.',
            error: error.message,
        });
    }
}