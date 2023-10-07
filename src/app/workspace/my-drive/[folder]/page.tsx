import FilesTable from "@/components/workspace/files-table";
import AddFolder from "@/components/workspace/workspace-dashboard/add-folder";
import { FolderCard } from "@/components/workspace/workspace-dashboard/folder-file-box";
import UploadFile from "@/components/workspace/workspace-dashboard/upload-file";
import { fetchFolders } from "@/lib/firebase/folder-utils";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

const MyDrive = async ({ params }: { params: { folder: string } }) => {
  const folders = await getData(params.folder);
  return (
    <div>
      <div className="flex flex-col items-start justify-start sm:flex-row ">
        <AddFolder
          className="mb-4 sm:mb-0 sm:mr-10"
          parentFolderId={params.folder}
        />
        <UploadFile parentFolderId={params.folder} />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {folders?.map((folder) => <FolderCard key={folder.id} {...folder} />)}
      </div>
      <FilesTable id={params.folder} />
    </div>
  );
};

export default MyDrive;

const getData = async (folderId: string) => {
  const session = await getServerSession(authOptions);
  if (session?.user.email) {
    const folders = await fetchFolders(session.user.email, folderId);
    return folders;
  }
};
