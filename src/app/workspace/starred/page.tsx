import { Separator } from "@/components/ui/separator";
import Starred from "@/components/workspace/starred";

export default function WorkspaceStarredPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Starred</h3>
        <p className="text-sm text-muted-foreground">
          Easily access and manage your favorite files and folders. Keep your
          most important items at your fingertips.
        </p>
      </div>
      <Separator />
      <Starred />
    </div>
  );
}
