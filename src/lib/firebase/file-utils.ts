import {
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { database, firebaseStorage } from "./firebase-config";
import type { FileProps } from "@/types";
import { deleteObject, ref } from "firebase/storage";

/**
 * Uploads a file to the Firebase database.
 *
 * @param {FileProps} file - Props of the file to upload.
 * @returns {Promise<void>} A promise that resolves when the file is uploaded successfully.
 * @throws {Error} If there's an error during the file uploading process.
 */
export async function uploadFile(file: FileProps): Promise<void> {
  try {
    // Create a reference to a new document in the 'files' collection.
    const fileDocRef = doc(database.files);

    // Set the document data with file properties.
    await setDoc(fileDocRef, {
      name: file.name,
      mimeSize: file.mimeSize,
      url: file.url,
      mimeType: file.mimeType,
      createdAt: serverTimestamp(),
      parentFolder: file.parentFolder,
      owner: file.owner,
      sharedWith: [],
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves files information based on email and optional parentId.
 *
 * @param {string} email - The email of the user to retrieve files for.
 * @param {string | null} parentId - (Optional) The parent folder ID to filter by.
 * @returns {Promise<FileProps[] | null>} An array of file data or null if not found.
 * @throws {Error} If there's an error during the data retrieval process or if the limit is invalid.
 */
export const fetchFiles = async (
  email: string,
  parentId?: string | null,
): Promise<FileProps[] | null> => {
  try {
    return getDocs(
      query(
        database.files,
        where("owner", "==", email),
        where("parentFolder", "==", parentId),
      ),
    ).then((querySnapshot) => {
      if (!querySnapshot.empty && querySnapshot.docs) {
        return database.formatDocs(querySnapshot.docs) as Array<FileProps>;
      } else {
        return null; // Return null when there is no files
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      // In case of non-Error objects, simply rethrow them.
      throw error;
    }
  }
};

/**
 * Retrieves file information based on fileId.
 *
 * @param {string} fileId - The unique identifier of the file to retrieve.
 * @returns {Promise<FileProps | null>} File data or null if not found.
 * @throws {Error} If there's an error during the data retrieval process.
 */
export const fetchFile = async (fileId: string): Promise<FileProps | null> => {
  try {
    const fileDocRef = doc(database.files, fileId);
    const snapshot = await getDoc(fileDocRef);
    if (snapshot.exists()) {
      return database.formatDoc(snapshot) as FileProps;
    } else {
      return null; // Return null when the file doesn't exist
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      // In case of non-Error objects, simply rethrow them.
      throw error;
    }
  }
};

/**
 * Deletes a file from the database and storage.
 *
 * @param {string} fileId - The ID or reference of the file to delete.
 * @param {string} email - The email of the owen of that file.
 * @param {string} fileName - The fileName of the file to delete.
 * @throws {Error} Throws an error if the deletion fails.
 * @returns {Promise<void>} A Promise that resolves when the file is successfully deleted.
 */
export async function deleteFile(
  fileId: string,
  email: string,
  fileName: string,
): Promise<void> {
  try {
    // Get a reference to the file in the database.
    const fileDocRef = doc(database.files, fileId);

    // Delete the file document from the database.
    await deleteDoc(fileDocRef);

    // Get a reference to the file in your storage.
    const fileStorageRef = ref(firebaseStorage, `users/${email}/${fileName}`);

    // Delete the file from storage.
    await deleteObject(fileStorageRef);
  } catch (error) {
    throw error;
  }
}

/**
 * Share a file with a specified user in Firebase Firestore.
 *
 * @param {string} fileId - The unique identifier of the file to be shared.
 * @param {string} sharedWith - The user with whom the file is to be shared.
 * @throws {Error} Throws an error if there's a problem while sharing the file.
 */
export const shareFile = async (fileId: string, sharedWith: string) => {
  try {
    // Get a reference to the file in the database (assuming Firebase Firestore).
    const fileDocRef = doc(database.files, fileId);

    // Use arrayUnion to add the 'sharedWith' value to the 'sharedWith' array field in Firestore.
    await updateDoc(fileDocRef, {
      sharedWith: arrayUnion(sharedWith),
    });
  } catch (error) {
    // Throw the error to indicate that there was a problem sharing the file.
    throw error;
  }
};

/**
 * Retrieves files that are shared with the specified user based on their email.
 *
 * @param {string} email - The email of the user to retrieve shared files for.
 * @returns {Promise<FileProps[] | null>} An array of shared file data or null if not found.
 * @throws {Error} If there's an error during the data retrieval process.
 */
export const fetchSharedFiles = async (
  email: string,
): Promise<FileProps[] | null> => {
  try {
    return getDocs(
      query(database.files, where("sharedWith", "array-contains", email)),
    ).then((querySnapshot) => {
      if (!querySnapshot.empty && querySnapshot.docs) {
        return database.formatDocs(querySnapshot.docs) as FileProps[];
      } else {
        return null; // Return null when there are no shared files
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      // In case of non-Error objects, simply rethrow them.
      throw error;
    }
  }
};
