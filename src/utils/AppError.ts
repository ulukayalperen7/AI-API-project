class AppError extends Error {
    // these are extra properties to name, message, stack etc.
    public readonly statusCode: number;

    // We determine the 'status' based on the statusCode.
    public readonly status: string;

    constructor(message: string, statusCode: number) {
        // to set up the error message properly
        super(message);

        this.statusCode = statusCode;

        if (`${statusCode}`.startsWith('4')) {
            this.status = 'client error';
        } else {
            this.status = 'server error';
        }
        //This line ensures the stack trace correctly points to where the error was created.
        /* it removes the AppError class we wrote from the error report,
         allowing the fingerprint to point directly to the source of the problem. */
        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;