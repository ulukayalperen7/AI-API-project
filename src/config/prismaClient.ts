/**
 * prisma is like the entire developer toolkit to manage db before the applicatio runs. 
 * prisma client is like the bridge that the app uses to talk to db*/
import { PrismaClient } from '@prisma/client';

// connection pooling

/** 
 * Client Instance :
 * We created a single and shared Instance of the PrismaClient.
 * only a single instance : imporves performance and reliability for our db.
 * we can access this instance from anywhere we want(service, controller ...) by importing it */
const prisma = new PrismaClient();

export default prisma;