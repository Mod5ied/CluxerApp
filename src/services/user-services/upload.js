import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../db_config";

export async function handleFileUpload(file) {
    // Create a reference to the file location
    const fileRef = ref(storage, 'deposits/');
    
    // Upload the file to the path
    uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot.metadata.contentType);
    }).catch((error) => {
        console.error('Upload failed:', error);
    });
}
