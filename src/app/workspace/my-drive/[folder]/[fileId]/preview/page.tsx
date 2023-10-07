import { Separator } from "@/components/ui/separator";
import { PdfViewer } from "@/components/workspace/file-preview";
import { fetchFile } from "@/lib/firebase/file-utils";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
export default async function FilePreviewPage({
  params,
}: {
  params: { fileId: string };
}) {
  const file = await getData(params.fileId);
  if (file?.url) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">File Preview</h3>
          <p className="text-sm text-muted-foreground">
            Preview and open files.
          </p>
        </div>
        <Separator />
        <PdfViewer pdfUrl={file?.url} mimeType={file.mimeType} />
      </div>
    );
  }
}
const getData = async (id: string) => {
  const session = await getServerSession(authOptions);
  if (session?.user.email) {
    const file = await fetchFile(id);
    return file;
  }
};
