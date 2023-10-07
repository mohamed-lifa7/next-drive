import { Separator } from "@/components/ui/separator";
import Recent from "@/components/workspace/recent";

export default function WorkspaceRecentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Recent</h3>
        <p className="text-sm text-muted-foreground">
          View and access your most recently used files and folders. Quickly
          find and continue your work.
        </p>
      </div>
      <Separator />
      <Recent />
    </div>
  );
}
