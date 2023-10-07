import {
  getDocs,
  query,
  where,
  limit,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database } from "./firebase-config";
import type { FileProps, UserProps } from "@/types";

/**
 * Retrieves user information based on their email.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<UserProps | null>} A user data or null if not found.
 * @throws {Error} If there's an error during the data retrieval process.
 */
export const fetchUser = async (email: string): Promise<UserProps | null> => {
  return getDocs(query(database.users, where("email", "==", email), limit(1)))
    .then((querySnapshot) => {
      if (!querySnapshot.empty && querySnapshot.docs[0]) {
        return database.formatDoc(querySnapshot.docs[0]) as UserProps;
      } else {
        return null; // Return null when the user is not found
      }
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * Updates user information in the database.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {string} newName - The new name to assign to the user.
 * @param {string} newImage - The new image to assign to the user.
 * @throws {Error} Throws an error if the update fails.
 * @returns {Promise<void>} A Promise that resolves when the user information is successfully updated.
 */
export async function updateUserInformation(
  userId: string,
  newName?: string,
  newImage?: string,
): Promise<void> {
  try {
    // Get a reference to the user document in the database.
    const userDocRef = doc(database.users, userId);

    // Update the user's email and name fields in the document.
    if (!newName && newImage) {
      await updateDoc(userDocRef, { image: newImage });
    } else if (newName && !newImage) {
      await updateDoc(userDocRef, { name: newName });
    } else if (newName && newImage) {
      await updateDoc(userDocRef, { name: newName, image: newImage });
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves the total storage used by a user based on their email.
 *
 * @param {string} userEmail - The user's email.
 * @returns {Promise<number | null>} - The total storage used by the user in bytes, or null if the user is not found or an error occurs.
 * @throws {Error} - If an error occurs while fetching the data.
 */
export const getUserTotalStorage = async (
  userEmail: string,
): Promise<number | null> => {
  try {
    const querySnapshot = await getDocs(
      query(database.files, where("owner", "==", userEmail)),
    );

    if (!querySnapshot.empty && querySnapshot.docs) {
      const fileDocs = database.formatDocs(
        querySnapshot.docs,
      ) as Array<FileProps>;
      const totalStorage = fileDocs.reduce(
        (sum, file) => sum + file.mimeSize,
        0,
      );
      return totalStorage;
    } else {
      return null; // User not found
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
};
