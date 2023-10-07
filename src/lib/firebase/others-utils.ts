import { doc, setDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { database } from "@/lib/firebase/firebase-config";
import type { FeedbackProps } from "@/types";

/**
 * Adds feedback to the Firebase database.
 *
 * @param {FeedbackProps} feedback - The feedback data to upload.
 * @returns {Promise<void>} A promise that resolves when the feedback is successfully added.
 * @throws {Error} If there's an error during the feedback addition process.
 */
export async function addFeedback(feedback: FeedbackProps): Promise<void> {
  try {
    // Create a reference to a new document in the 'feedback' collection.
    const feedbackDocRef = doc(database.feedback);

    // Set the document data with feedback properties.
    await setDoc(feedbackDocRef, {
      email: feedback.email,
      createdAt: serverTimestamp(),
      message: feedback.message,
      subject: feedback.subject,
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves all feedbacks from the database.
 *
 * @returns {Promise<FeedbackProps[] | null>} An array of all feedback data or null if not found.
 * @throws {Error} If there's an error during the data retrieval process.
 */
export const fetchAllFeedbacks = async (): Promise<FeedbackProps[] | null> => {
  try {
    return getDocs(database.feedback).then((snapshot) => {
      if (!snapshot.empty && snapshot.docs) {
        return database.formatDocs(snapshot.docs) as Array<FeedbackProps>;
      }
      return null; // Return null when there are no feedbacks
    });
  } catch (error) {
    if (error instanceof Error) {
      // rethrow any errors encountered during the retrieval process.
      throw error;
    } else {
      // In case of non-Error objects, simply rethrow them.
      throw error;
    }
  }
};
