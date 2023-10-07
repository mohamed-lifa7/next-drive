import { columns } from "@/components/workspace/my-drive-management/columns";
import { DataTable } from "@/components/ui/data-table";
import { fetchFiles } from "@/lib/firebase/file-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const FilesTable = async ({ id }: { id: string | null }) => {
  const data = await getData(id);

  if (!data) {
    return <p>No Files available.</p>;
  }
  return <DataTable columns={columns} data={data} />;
};

export default FilesTable;

const getData = async (id: string | null) => {
  const session = await getServerSession(authOptions);
  if (session?.user.email) {
    const files = await fetchFiles(session.user.email, id);
    return files;
  }
};
