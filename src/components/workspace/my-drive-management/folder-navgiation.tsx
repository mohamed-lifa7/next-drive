"use client";
import { useFolderContext } from "@/context/folder-navigation.context";
export default function FolderNavigation() {
  const { currentFolder } = useFolderContext() ?? { currentFolder: null };
  return (
    <>
      {currentFolder && (
        <p>
          {currentFolder.map((folder, index) => (
            <span key={folder.id}>
              {index > 0 && " > "}
              {folder.name}
            </span>
          ))}
        </p>
      )}
    </>
  );
}
