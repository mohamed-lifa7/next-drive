import { Separator } from "@/components/ui/separator";
import StorageUsage from "@/components/workspace/storage-usage";
import { getUserTotalStorage } from "@/lib/firebase/user-utils";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function WorkspaceStorageUsagePage() {
  const session = await getServerSession(authOptions);
  if (session) {
    const userTotalStorage = await getUserTotalStorage(session.user.email!);
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Storage usage</h3>
          <p className="text-sm text-muted-foreground">
            Monitor and manage your storage space efficiently. View your usage
            statistics, clear up space, or upgrade your plan.
          </p>
        </div>
        <Separator />
        <StorageUsage totalStorage={userTotalStorage!} />
      </div>
    );
  } else {
    redirect("/auth/signin");
  }
}
