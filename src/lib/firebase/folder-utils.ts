import {
  getDocs,
  query,
  where,
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "./firebase-config";

import { deleteDocumentsWithParent, deleteSubcollections } from "./helpers";

import type { FolderProps } from "@/types";

/**
 * Adds a folder to the Firebase database.
 *
 * @param {FolderProps} folder - Properties of the folder to add.
 * @returns {Promise<void>} A promise that resolves when the folder is added successfully.
 * @throws {Error} If there's an error during the folder creation process.
 */
export async function addFolder(folder: FolderProps): Promise<void> {
  try {
    // Create a reference to a new document in the 'folders' collection.
    const folderDocRef = doc(database.folders);

    if (folder.name.trim() === "") {
      throw new Error("folder name cannot be empty.");
    }

    // Set the document data with folder properties.
    await setDoc(folderDocRef, {
      name: folder.name,
      createdAt: serverTimestamp(),
      parentId: folder.parentId ?? null, // Use null if parentId is not provided
      owner: folder.owner,
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves folder information based on email and optional parentId.
 *
 * @param {string} email - The email of the user to retrieve folders for.
 * @param {string | null} parentId - (Optional) The parent folder ID to filter by.
 * @returns {Promise<FolderProps[] | null>} An array of folder data or null if not found.
 * @throws {Error} If there's an error during the data retrieval process or if the limit is invalid.
 */
export const fetchFolders = async (
  email: string,
  parentId: string | null,
): Promise<FolderProps[] | null> => {
  try {
    return getDocs(
      query(
        database.folders,
        where("owner", "==", email),
        where("parentId", "==", parentId),
      ),
    ).then((querySnapshot) => {
      if (!querySnapshot.empty && querySnapshot.docs) {
        return database.formatDocs(querySnapshot.docs) as Array<FolderProps>;
      } else {
        return null; // Return null when there is no Folders
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
 * Deletes a folder and its contents from the database.
 * @todo Implement the deletion of subcollections in a future update.
 * @param {string} folderId - The ID of the folder to delete.
 * @throws {Error} Throws an error if the deletion fails.
 * @returns {Promise<void>} A Promise that resolves when the folder is successfully deleted.
 */
export async function deleteFolder(folderId: string): Promise<void> {
  try {
    // Recursively delete subcollections
    await deleteSubcollections(folderId);

    // Get a reference to the folder document in the database.
    const folderDocRef = doc(database.folders, folderId);

    // Delete the folder document.
    await deleteDocumentsWithParent(folderId);
    await deleteDoc(folderDocRef);
  } catch (error) {
    throw error;
  }
}

/**
 * Updates the name of a folder in the database.
 *
 * @param {string} folderId - The ID of the folder to update.
 * @param {string} newName - The new name to assign to the folder.
 * @throws {Error} Throws an error if the update fails.
 * @returns {Promise<void>} A Promise that resolves when the folder name is successfully updated.
 */
export async function updateFolderName(
  folderId: string,
  newName: string,
): Promise<void> {
  try {
    // Get a reference to the folder document in the database.
    const folderDocRef = doc(database.folders, folderId);
    if (newName.trim() === "") {
      throw new Error("New folder name cannot be empty.");
    }
    // Update the folder name field in the document.
    await updateDoc(folderDocRef, { name: newName });
  } catch (error) {
    throw error;
  }
}
