import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ExecuteTemplateDto } from './dtos/execute-template.dto';


/**
 * This is our new validation middleware
 * we use class-validator instead of ZOD.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The Express next function.
 */
export const validateExecuteTemplate = async (req: Request, res: Response, next: NextFunction) => {

    /*  transform the plain, raw JS object from req.body 
     into an instance of our DTO. */
    const requestObject = plainToInstance(ExecuteTemplateDto, req.body);


    /* 
      here it validates the new created object against the rules
      defined in the DTO class.
      "validate" returns an array of errors, if the array is empty
      validation is OK */
    const errors = await validate(requestObject);

    // if any error occurs
    if (errors.length > 0) {
        console.log("VALIDATION ERROR: ", errors);
        return res.status(400).json({
            message: "Invalid request body",
            // We map the error array to a simpler format.
            errors: errors.map(err => ({
                property: err.property,
                constraints: err.constraints
            })),
        });
    }
    console.log("VALIDATION: Request body is valid");
    // 4. If validation passes, call next() to move to the controller.
    next();
};