"use client";

import { FolderPlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { addFolder } from "@/lib/firebase/folder-utils";

import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

const AddFolder = ({
  className,
  parentFolderId,
}: {
  className?: string | undefined;
  parentFolderId?: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const [folderName, setFolderName] = useState("Untitled folder");
  const submitAddingFolder = () => {
    if (session?.user.email) {
      void addFolder({
        name: folderName.trim(),
        owner: session?.user.email,
        parentId: parentFolderId,
      })
        .then(() => {
          toast({
            title: "Success!",
            description: `You have successfully added a new folder with name : ${folderName}`,
          });
          router.refresh();
        })
        .catch((_error) => {
          toast({
            variant: "destructive",
            title: "Error added a new folder",
            description: "An error occurred while adding a new folder.",
            action: <ToastAction altText="">Try again</ToastAction>,
          });
        });
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className={cn(className)}>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            Add a New Folder
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a New Folder</DialogTitle>
            <DialogDescription>
              Enter the details below to create a new folder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
              }}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                submitAddingFolder();
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFolder;
