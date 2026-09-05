import {Client, Databases, Account, Storage} from "appwrite";

console.log("ENV:", import.meta.env);

const client = new Client()
    .setEndpoint(import.meta.env.VITE_OPTIMA_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_OPTIMA_PROJECT_ID);


const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client); 

export {databases, account, storage};