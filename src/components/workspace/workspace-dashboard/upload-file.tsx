"use client";
import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase/firebase-config";
import type { FileProps } from "@/types";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/firebase/file-utils";

const UploadFile = ({
  className,
  parentFolderId,
}: {
  className?: string | undefined;
  parentFolderId?: string;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [progressPercent, setProgressPercent] = useState(0);
  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(
      firebaseStorage,
      `users/${session?.user.email}/${file.name}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Add a state variable to keep track of the upload progress

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgressPercent(progress);
      },
      (_error) => {
        toast({
          variant: "destructive",
          title: "Error uploading a new file",
          description: "An error occurred while uploading file to the storage.",
          action: <ToastAction altText="">Try again</ToastAction>,
        });
        console.error(
          "Oops! Something went wrong during the upload. Gremlins, maybe?",
        );
      },
      () => {
        // Upload is complete; you can use the progressPercent state here
        setProgressPercent(0);
      },
    );

    try {
      await uploadTask; // Wait for the upload to complete
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      if (downloadURL && session?.user.email) {
        const fileToUpload: FileProps = {
          name: file.name,
          mimeSize: file.size,
          url: downloadURL,
          mimeType: file.type,
          parentFolder: parentFolderId ?? null,
          owner: session.user.email,
          sharedWith: [],
        };

        try {
          // Upload the metadata to Firestore
          await uploadFile(fileToUpload);

          toast({
            title: "Success!",
            description: "You have successfully uploaded a new file.",
          });
          router.refresh();
        } catch (firestoreError) {
          // Handle Firestore upload error
          toast({
            variant: "destructive",
            title: "Error uploading a new file",
            description: "An error occurred while uploading metadata.",
            action: <ToastAction altText="">Try again</ToastAction>,
          });
          console.error(
            "Oops! Firestore didn't like our metadata. Debugging hats on! 🕵️‍♂️",
          );
          // Optionally, you can delete the uploaded file from Storage here
        }
      }
    } catch (storageError) {
      // Handle Storage upload error
      toast({
        variant: "destructive",
        title: "Error uploading a new file",
        description: "An error occurred while uploading to Firebase Storage.",
        action: <ToastAction altText="">Try again</ToastAction>,
      });
      console.error(
        "Uh-oh! Firebase Storage is giving us trouble. Time for some magic spells! 🧙‍♂️",
      );
    }
  };

  return (
    <>
      <div className={className}>
        <Input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={(event) => {
            void handleUploadFile(event);
          }}
        />

        <Button variant="outline" asChild>
          <Label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Upload file
          </Label>
        </Button>
        <Progress
          value={progressPercent}
          className="w-full"
          hidden={progressPercent == 0 ? true : false}
        />
      </div>
    </>
  );
};

export default UploadFile;
