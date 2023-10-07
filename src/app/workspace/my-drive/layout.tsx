import { Separator } from "@/components/ui/separator";
import FolderNavigation from "@/components/workspace/my-drive-management/folder-navgiation";
export default function MyDriveLoyout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">My drive</h3>
        <p className="text-sm text-muted-foreground">
          Your personal storage space. Manage files, create folders, and access
          your data from anywhere.
        </p>
      </div>
      <Separator />
      <div>
        <FolderNavigation />
      </div>
      <div>{children}</div>
    </div>
  );
}
