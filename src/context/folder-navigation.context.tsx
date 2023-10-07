"use client";
import { type FolderProps } from "@/types";
import React, { createContext, useContext, useState } from "react";

// Create the context
const FolderContext = createContext<null | {
  currentFolder: FolderProps[] | null;
  navigateToFolder: (folder: FolderProps[]) => void;
  navigateToRoot: () => void;
}>(null);

// Custom hook to access the context
export const useFolderContext = () => useContext(FolderContext);

// Folder context provider component
export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [currentFolder, setCurrentFolder] = useState<FolderProps[] | null>(
    null,
  );

  const navigateToFolder = (folder: FolderProps[]) => {
    setCurrentFolder(folder);
  };

  const navigateToRoot = () => {
    setCurrentFolder(null);
  };

  const contextValue = {
    currentFolder: currentFolder ?? [],
    navigateToFolder,
    navigateToRoot,
  };

  return (
    <FolderContext.Provider value={contextValue}>
      {children}
    </FolderContext.Provider>
  );
}
