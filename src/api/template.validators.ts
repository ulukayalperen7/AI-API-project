// We need 'Request', 'Response', and 'NextFunction' to create our Express middleware.
import { Request, Response, NextFunction } from "express";

// z : to build our schema;  ZodError : to specificially catch validation errors
import { z, ZodError } from 'zod';

/**
 * this schema describes the exact shape we expect the request body to have 
 */
const executeTemplateSchema = z.object({
    // We expect a 'placeholders' property in the body.
    placeholders:
        // The .refine() method allows us to add custom validation rules.
        z.record(z.string()).refine(
            // The first argument is the validation function. It receives the object to check.
            // We check if the array of the object's keys has a length greater than 0.
            (placeholdersObject) => Object.keys(placeholdersObject).length > 0,
            { message: "placeholders object cannot be empty." }
        ),
});

/**
 * This is our validation middleware. It acts as a gatekeeper for out route.
 * Uses the schema we defined above to check if the incoming request body is valid.
 * @param req The Express request object
 * @param res The Express response object
 * @param next The Express next func to call if validation is successful
 * @returns 
 */
export const validateExeceuteTemplate = (req: Request, res: Response, next: NextFunction) => {

    try {
        /*  Attempt to parse and validate the request body against our schema.
            If the body doesn't match the schema, Zod will throw an error.*/
        executeTemplateSchema.parse(req.body);

        // if no error occurs
        console.log("VALIDATION: Request body is valid.");
        // to pass the request along to the next stop: our controller
        next();
    } catch (error) {
        // We check if the error is specifically a ZodError.
        if (error instanceof ZodError) {
            console.error("VALIDATION ERROR:", error.errors);
            // If it is, we send a 400 Bad Request response.
            return res.status(400).json({
                message: "Invalid request body",
                errors: error.format(),
            });
        }
        // If it's some other unexpected error, we send a generic 500 error.
        res.status(500).json({ message: "An internal server error occurred during validation." });
    }
};