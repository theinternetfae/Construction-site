import { ID } from "appwrite";
import { storage } from "./config";

const str = {};

const bucket = [
    {
        stId: import.meta.env.VITE_OPTIMA3_STORAGE_ID_PFP,
        name: "pfp",   
    }
]

bucket.forEach(b => {
    str[b.name] = {

        create: (id = ID.unique(), payload) => 
            storage.createFile(
                b.stId,
                id,
                payload
        ),

        check: (id) => 
            storage.getFile(
                b.stId,
                id
        ),
        
        getUrl: (id) => 
            storage.getFileView(
                b.stId,
                id,
        ),
        
        delete: (id) => 
            storage.deleteFile(
                b.stId,
                id
        ) 

    }
})

export default str;