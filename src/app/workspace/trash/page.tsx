import { Separator } from "@/components/ui/separator";
import Trash from "@/components/workspace/trash";

export default function WorkspaceTrashPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Trash</h3>
        <p className="text-sm text-muted-foreground">
          Recover or permanently delete your deleted files and folders. Explore
          items you&apos;ve discarded.
        </p>
      </div>
      <Separator />
      <Trash />
    </div>
  );
}
