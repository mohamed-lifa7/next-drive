import FilesTable from "@/components/workspace/files-table";
import AddFolder from "@/components/workspace/workspace-dashboard/add-folder";
import { FolderCard } from "@/components/workspace/workspace-dashboard/folder-file-box";
import UploadFile from "@/components/workspace/workspace-dashboard/upload-file";
import { fetchFolders } from "@/lib/firebase/folder-utils";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

const MyDrive = async () => {
  const folders = await getData();
  return (
    <div>
      <div className="mb-2 flex flex-col items-start justify-start sm:flex-row">
        <AddFolder className="mb-4 sm:mb-0 sm:mr-10" />
        <UploadFile />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {folders?.map((folder) => <FolderCard key={folder.id} {...folder} />)}
      </div>
      <FilesTable id={null} />
    </div>
  );
};

export default MyDrive;

const getData = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.email) {
    const folders = await fetchFolders(session.user.email, null);
    return folders;
  }
};
