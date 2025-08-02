import { error } from "console";
import { Request, Response, NextFunction } from "express";

// this interface makes the type of errors to be caught more specific
interface AppError extends Error {
    statusCode?: number;
}

/**
 * this is our global error catcher 
 * It cathes an error thrown from anyewhere in the app
 * This is the only place where we format errors and send them to the user
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    // if no specific code, set default 500
    err.statusCode = err.statusCode || 500;

    console.error(`[GLOBAL ERROR HANDLER] Caught an error:`, err);

    // send a standardized JSON error to the user
    res.status(err.statusCode).json({
        status: 'error',
        message: err.message || 'Something went wrong!',
    })
}