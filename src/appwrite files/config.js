import {Client, Databases} from "appwrite";

console.log("ENV:", import.meta.env);

const client = new Client()
    .setEndpoint(import.meta.env.VITE_OPTIMA3_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_OPTIMA3_PROJECT_ID);


const databases = new Databases(client);

export {databases};