import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();// Load environment variables

/* It imports the express library and its types into the project. */
import express, { Express, Request, Response } from 'express';

import cors from 'cors';

// The path to main.routes.js is corrected.
// Since server.ts is in 'src', the path starts from './api/...'
import mainRoutes from './src/api/main.routes';

import { globalErrorHandler } from './src/middlewares/errorHandler';

/* The express constant is actually a function.
When we call this function with (), it creates a new Express application instance.
All our server logic, routing, and middleware will be configured through this app object. */
const app: Express = express();  // The 'app' variable is typed as Express.


// --- MIDDLEWARES ---
// These are functions that run on every request before it reaches our route handlers

// Enable Cross-Origin Resource Sharing (CORS)
/* cors is like a security guard on our API server that says,
"It's okay, I trust requests coming from our front-end application."
We need to enable it now so we don't have problems later when a user
interface tries to connect to our API. */
app.use(cors());

//  Enable the server to understand incoming JSON data
/* When we send data to our API (like a block of text to be summarized),
we will send it in JSON format. This middleware is a built-in "translator" in Express
 that takes that incoming JSON data and makes it easily accessible in our code */
app.use(express.json());

// Express automatically understands it is an error handler when it faces a middleware with 4 parameters
app.use(globalErrorHandler);

// SERVER CONFIG
// The port is explicitly cast to a number for type safety.
const PORT: number = Number(process.env.PORT) || 3000;

/* req (Request): Object containing all information about the incoming
request (request headers, parameters, sender IP, etc.). */
/* res (Response): The object we will use to send a response back to the client that made the request. */
// The req and res parameters are now correctly typed.
app.get('/', (req: Request, res: Response) => {

    /* It calls the send() method of the response object.
     This method sends a response to the client and completes the request.
     If you put text in the send() method, it automatically sets the Content-Type header to text/html.
     If you put a JavaScript object, it automatically converts it to JSON and sets
     the Content-Type header to application/json. */
    res.send('AI Content Lab is working')
});

//   -- API ROUTES --
app.use('/api/v1', mainRoutes);


//    START THE SERVER
app.listen(PORT, () => { // this method starts the express server; the callback runs only once when the server starts.
    console.log(`Server has been started on http://localhost:${PORT}`);  // Template Literal
});