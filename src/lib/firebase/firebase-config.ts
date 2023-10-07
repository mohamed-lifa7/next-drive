import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {  collection, getFirestore } from "firebase/firestore";
import type { CollectionReference, DocumentSnapshot } from "firebase/firestore";
import { env } from "@/env.mjs";
import type{ FeedbackProps, FileProps, FolderProps, UserProps } from "@/types";

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey:env.NEXT_PUBLIC_FIREBASE_API_KEY ,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:env.NEXT_PUBLIC_FIREBASE_APP_ID, 
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
export const firestore = getFirestore(app);
export const database = {
 users : collection(firestore, "users") as CollectionReference<UserProps>,
 files : collection(firestore, "files") as CollectionReference<FileProps>,
 folders : collection(firestore, "folders") as CollectionReference<FolderProps>,
 feedback : collection(firestore, "feedback") as CollectionReference<FeedbackProps>,
 formatDoc: (doc : DocumentSnapshot)  => {
  return { id:doc.id, ...doc.data()} as UserProps | FileProps | FolderProps | FeedbackProps;
 },
 formatDocs: (docs: Array<DocumentSnapshot>) => {
  return docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Array<UserProps | FileProps | FolderProps | FeedbackProps>;
},
}