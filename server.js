/* It imports the express library into the project using Node.js's CommonJS module system.
 The require function finds the express package in the node_modules directory and assigns
 the main object/function that the package exports to a constant named express. */
const express = require('express');

/* The express constant is actually a function. 
When we call this function with (), it creates a new Express application instance. 
All our server logic, routing, and middleware will be configured through this app object. */
const app = express();

const PORT = 3000;

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

app.listen(PORT, () => { // this method starts the express server; the callback runs only once when the server starts.
    console.log(`Server has been started on http://localhost:${PORT}`);  // Template Literal
});