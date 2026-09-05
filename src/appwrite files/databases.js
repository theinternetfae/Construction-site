import { databases } from "./config.js";
import { ID } from "appwrite";

const db = {};

const database = [
    {
        dbId: import.meta.env.VITE_OPTIMA_DATABASE_ID_TASKLIST,
        id: import.meta.env.VITE_OPTIMA_TABLE_ID_TASKS,
        name: "tasks",
    }
]

database.forEach(d => {
    db[d.name] = {
        create: (payload, permissions, id = ID.unique()) =>
            databases.createDocument(
                d.dbId,
                d.id,
                id,
                payload,
                permissions
            ),
        update: (id, payload, permissions) =>
            databases.updateDocument(
                d.dbId,
                d.id,
                id,
                payload,
                permissions
            ),
        delete: (id) => databases.deleteDocument(d.dbId, d.id, id),

        list: (queries = []) =>
            databases.listDocuments(d.dbId, d.id, queries),

        get: (id) => databases.getDocument(d.dbId, d.id, id),
    };
});

export default db;