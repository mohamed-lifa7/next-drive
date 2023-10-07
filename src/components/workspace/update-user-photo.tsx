"use client";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { firebaseStorage } from "@/lib/firebase/firebase-config";
import { type ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import { updateUserInformation } from "@/lib/firebase/user-utils";
import { Card, CardContent } from "@/components/ui/card";
const UpdateUserPhoto = ({ userId, url }: { userId?: string; url: string }) => {
  const { toast } = useToast();
  const [imgUrl, setImgUrl] = useState<string | null>(url);
  const [progresspercent, setProgresspercent] = useState(0);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    const storageRef = ref(firebaseStorage, `users/${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          updateUserInformation(userId!, undefined, downloadURL)
            .then(() => {
              toast({
                title: "Photo Updated",
                description:
                  "Your profile photo has been successfully updated.",
              });
            })
            .catch((_error) => {
              toast({
                variant: "destructive",
                title: "Error Updating Photo",
                description:
                  "There was an error while updating your profile photo. Please try again later.",
              });
            });
        });
      },
    );
  };
  return (
    <div>
      <Card>
        <CardContent>
          <div className="my-4 flex flex-wrap items-center justify-around">
            {imgUrl && (
              <Image
                src={imgUrl}
                alt="your image"
                width={200}
                height={200}
                className="rounded-full"
              />
            )}
            <Button asChild className="my-4 w-[200px]">
              <Label htmlFor="user-image" className="flex cursor-pointer">
                <ImagePlus className="mr-2 h-4 w-4" />
                upload new photo
                <Input
                  type="file"
                  id="user-image"
                  accept="image/*"
                  onChange={(event) => {
                    handleImageChange(event);
                  }}
                  className="hidden"
                />
              </Label>
            </Button>
          </div>
          {progresspercent != 0 && (
            <Progress value={progresspercent} className="my-4 w-full" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default UpdateUserPhoto;
