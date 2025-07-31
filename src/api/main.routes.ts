import { Router } from "express";

import { executeTemplate } from "../controllers/template.controller";

const router = Router(); // we create a new router instance 


/** 
 * This tells our router to listen specifically for an HTTP POST request.
 * POST: Used when the client wants to send a body of data to the server to perform an action or create a resource. 
 * When a POST request arrives at a matching URL, Express will run the executeTemplate callback function. 
 * It then passes the request (req) and response (res) objects to that function so it can do its job.
*/
/**
 * @route POST /api/v1/templates/:id/execute
 * @desc Executes a specific AI template
 * @access Public(for now)
 */
router.post('/templates/:id/execute', executeTemplate);


/**
 * next step will be to go into server.js and import this router. 
 * We will then tell our main app to use it. 
 * This is the final step that "plugs" our mini-application (the router) into the main application.
 */
export default router;