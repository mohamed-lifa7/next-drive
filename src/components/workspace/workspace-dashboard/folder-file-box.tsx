"use client";
import { Button } from "@/components/ui/button";
import type { FolderProps } from "@/types";
import {
  Folder,
  FolderOutput,
  MoreVertical,
  Trash,
  FolderEdit,
  Loader2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteFolder, updateFolderName } from "@/lib/firebase/folder-utils";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FolderCard = (folder: FolderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [folderNewName, setFolderNewName] = useState<string>(folder.name);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hadnleNamingFolder = () => {
    if (folderNewName.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New folder name cannot be empty.",
        action: (
          <ToastAction altText="Enter a valid name">
            Enter a valid name
          </ToastAction>
        ),
      });
      return;
    }
    void updateFolderName(folder.id!, folderNewName.trim())
      .then(() => {
        toast({
          title: "Folder Renamed",
          description: `The folder name has been updated successfully.`,
        });
        router.refresh();
      })
      .catch((_error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was an error while renaming the folder",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <div className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-2 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            <div className="itmes-center grid w-[10%] justify-start ">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
            </div>
            <div className="flex w-full max-w-[80%] justify-start">
              <TooltipTrigger className="flex max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                <Link
                  href={`/workspace/my-drive/${folder.id}`}
                  aria-disabled={isLoading}
                >
                  <span className="flex-1">{folder.name}</span>
                </Link>
              </TooltipTrigger>
            </div>
            <TooltipContent>
              <p>{folder.name}</p>
            </TooltipContent>
            <Separator orientation="vertical" className="h-10" />
            <div className="w-[10%] px-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLoading(true);
                      void deleteFolder(folder.id!)
                        .then(() => {
                          toast({
                            title: "Success",
                            description: "Folder deleted successfully.",
                          });
                          router.refresh();
                        })
                        .catch((_error) => {
                          toast({
                            variant: "destructive",
                            title: "Error",
                            description:
                              "An error occurred while deleting the folder.",
                            action: (
                              <ToastAction altText="">Try again</ToastAction>
                            ),
                          });
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer">
                      <FolderEdit className="mr-2 h-4 w-4" />
                      <span>Rename</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Rename Folder</DialogTitle>
                  <DialogDescription>
                    Enter a new name for the folder. The folder will be renamed
                    with the new name you provide.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    New name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={folderNewName}
                    onChange={(e) => {
                      setFolderNewName(e.target.value);
                    }}
                  />
                </div>
                <DialogFooter>
                  <Button
                    onClick={(e) => {
                      setIsLoading(true);
                      e.preventDefault();
                      setIsOpen(false);
                      hadnleNamingFolder();
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </div>
          </div>
        </Tooltip>
      </Dialog>
    </>
  );
};

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <FolderOutput className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
};

export { FolderCard, BackButton };
