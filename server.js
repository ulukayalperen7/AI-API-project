import dotenv from 'dotenv';

/* It imports the express library into the project using Node.js's CommonJS module system.
 The require function finds the express package in the node_modules directory and assigns
 the main object/function that the package exports to a constant named express. */
import express from 'express';

import cors from 'cors';

dotenv.config();// Load environment variables

/* The express constant is actually a function. 
When we call this function with (), it creates a new Express application instance. 
All our server logic, routing, and middleware will be configured through this app object. */
const app = express();  // initalize the express app


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


// SERVER CONFIG
const PORT = process.env.PORT || 3000; // The port is read from the .env file, if not found, default:3000

/* req (Request): Object containing all information about the incoming 
request (request headers, parameters, sender IP, etc.). */
/* res (Response): The object we will use to send a response back to the client that made the request. */
app.get('/', (req, res) => {

    /* It calls the send() method of the response object.
     This method sends a response to the client and completes the request.
     If you put text in the send() method, it automatically sets the Content-Type header to text/html.
     If you put a JavaScript object, it automatically converts it to JSON and sets
     the Content-Type header to application/json. */
    res.send('AI Content Lab is working')
});

//    START THE SERVER
app.listen(PORT, () => { // this method starts the express server; the callback runs only once when the server starts.
    console.log(`Server has been started on http://localhost:${PORT}`);  // Template Literal
});