"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shareFile } from "@/lib/firebase/file-utils";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
const ShareFileForm = ({ fileId }: { fileId: string }) => {
  const [sharedWith, setSharedWith] = useState("");
  const router = useRouter();
  const handleSharingFile = () => {
    shareFile(fileId, sharedWith)
      .then(() => {
        toast({
          title: "Success",
          description: "File shared successfully.",
        });
        router.refresh();
      })
      .catch((_error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while sharing the file.",
          action: <ToastAction altText="">Try again</ToastAction>,
        });
      });
  };
  return (
    <div className="my-6 flex">
      <Input
        type="email"
        placeholder="Add people ..."
        value={sharedWith}
        onChange={(e) => {
          setSharedWith(e.target.value);
        }}
      />
      <Button
        className="ml-4"
        onClick={(e) => {
          e.preventDefault();
          handleSharingFile();
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default ShareFileForm;
