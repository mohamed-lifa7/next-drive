import { Separator } from "@/components/ui/separator";
import SharedWithMe from "@/components/workspace/shared-with-me";

export default function WorkspaceSharedWithMe() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Shared With Me</h3>
        <p className="text-sm text-muted-foreground">
          Explore files and folders that others have shared with you.
          Collaborate and access shared resources seamlessly.
        </p>
      </div>
      <Separator />
      <SharedWithMe />
    </div>
  );
}
