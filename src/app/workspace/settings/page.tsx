import { Separator } from "@/components/ui/separator";
import Settings from "@/components/workspace/settings";

export default function WorkspaceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize your account and website settings to optimize your
          experience.
        </p>
      </div>
      <Separator />
      <Settings />
    </div>
  );
}
