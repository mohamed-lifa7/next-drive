"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Viewer from "react-viewer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileDown, ImageOff } from "lucide-react";
import Link from "next/link";

export function PdfViewer({
  pdfUrl,
  mimeType,
}: {
  pdfUrl: string;
  mimeType: string;
}) {
  const [visible, setVisible] = useState(false);
  const isImageMimeType = mimeType.startsWith("image/");
  return (
    <div className="">
      {!isImageMimeType && (
        <>
          <Alert>
            <ImageOff className="h-4 w-4" />
            <AlertTitle>Only Image View Is Supported</AlertTitle>
            <AlertDescription>
              You can only view images. Other types are not supported yet.
            </AlertDescription>
          </Alert>
          <Button asChild className="my-4">
            <Link href={pdfUrl}>
              <FileDown className="mr-2 h-4 w-4" /> DownLoad
            </Link>
          </Button>
        </>
      )}
      <Button
        className="my-4"
        disabled={!isImageMimeType}
        onClick={() => {
          setVisible(true);
        }}
      >
        Show image
      </Button>
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={[{ src: pdfUrl, alt: "" }]}
      />
    </div>
  );
}
