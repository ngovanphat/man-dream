

import { getStorage,  getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
import { getDatabase, set, push, child,  ref as databaseRef } from "firebase/database";

export default function Helper() {

    const storage = getStorage();
    const database = getDatabase();

    async function uploadToStorage(filePath, file) {
        const uploadImageRef = storageRef(storage,`${filePath}`);
        await uploadBytes(uploadImageRef, file);
        const downloadUrl = await getDownloadURL(uploadImageRef);

        return downloadUrl;
    }

    async function writeToDatabase(payload) {
        const key = push(child(databaseRef(database), 'wanna_nude_queue')).key;
        set(databaseRef(database,'/wanna_nude_queue/'+ key), payload);
        return key;
    }


    return {
        uploadToStorage,
        writeToDatabase
    }
}