import { sharedWithMeColumns } from "@/components/workspace/my-drive-management/columns";
import { DataTable } from "@/components/ui/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

import { fetchSharedFiles } from "@/lib/firebase/file-utils";
const SharedWithMe = async () => {
  const data = await getData();
  if (!data) {
    return <p>No Files available.</p>;
  }
  return (
    <>
      <DataTable columns={sharedWithMeColumns} data={data} />
    </>
  );
};

export default SharedWithMe;
const getData = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.email) {
    const files = await fetchSharedFiles(session.user.email);
    return files;
  }
};
