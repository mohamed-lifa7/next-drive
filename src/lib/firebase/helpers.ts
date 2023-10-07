import { getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { database } from "./firebase-config";
import type {FileProps } from "@/types";
import { deleteFile } from "./file-utils";

/* ============================================================ */

/**
 * Converts a size in bytes to a human-readable string representation
 * with appropriate units (bytes, KB, MB).
 *
 * @param {number} bytes - The size in bytes.
 * @returns {string | null} A string representing the size with appropriate units.
 */
function convertSize(bytes:number|null):string | null {
    if(!bytes){
      return null;
    } else if (bytes < 1024) {
      // If less than 1 KB, show in bytes
      return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
      // If less than 1 MB, convert to KB and show
      const kb = (bytes / 1024).toFixed(2); // Limit to 2 decimal places
      return kb + ' KB';
    } else {
      // If 1 MB or more, convert to MB and show
      const mb = (bytes / (1024 * 1024)).toFixed(2); // Limit to 2 decimal places
      return mb + ' MB';
    }
}

/**
 * Recursively delete subcollections of a folder.
 * @param {string} folderId - The ID of the folder whose subcollections need to be deleted.
 */
async function deleteSubcollections(folderId:string,) {
  const subcollectionsQuery = query(database.folders, where('parentId', '==', folderId));
  const subcollectionsSnapshot = await getDocs(subcollectionsQuery);

  // Recursively delete subcollections
  for (const docSnap of subcollectionsSnapshot.docs) {
    const subcollectionId = docSnap.id;

    // Delete all documents where 'parentFolder' matches subcollectionId
    await deleteDocumentsWithParent(subcollectionId);

    // Recursively delete sub-subcollections
    await deleteSubcollections(subcollectionId);

    // Delete the subcollection document itself.
    const subcollectionDocRef = doc(database.folders, subcollectionId);
    await deleteDoc(subcollectionDocRef);
  }
}

/**
 * Deletes all documents where 'parentFolder' matches a given subcollectionId.
 * @param {string} subcollectionId - The ID of the subcollection whose documents need to be deleted.
 */
async function deleteDocumentsWithParent(subcollectionId:string) {
  const documentsQuery = query(database.files, where('parentFolder', '==', subcollectionId));
  const documentsSnapshot = await getDocs(documentsQuery);

  for (const docSnap of documentsSnapshot.docs) {
    const docData = database.formatDoc(docSnap) as FileProps
    await deleteFile(docData.id!, docData.owner, docData.name)
  }
}


/**
 * Calculates the percentage of a numerator relative to a denominator.
 *
 * @param {number} numerator - The numerator.
 * @param {number} denominator - The denominator.
 * @returns {number} A number representing the percentage.
 */
function calculatePercentage(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return NaN; // You might want to handle this case differently
  }

  const percentage = ((numerator / denominator) * 100).toFixed(2); // Limit to 2 decimal places
  return parseFloat(percentage); // Convert the result back to a number
}


export {
  convertSize,
    deleteSubcollections,
    deleteDocumentsWithParent,
    calculatePercentage,
}