import { Separator } from "@/components/ui/separator";
import WorkspaceDashboard from "@/components/workspace/workspace-dashboard";
export default function WorkspaceDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Dashboard</h3>
        <p className="text-sm text-muted-foreground">
          Welcome to your workspace dashboard. Here, you can upload files,
          create folders, and manage your workspace efficiently. Explore the
          various tools and features to stay organized and productive.
        </p>
      </div>
      <Separator />
      <WorkspaceDashboard />
    </div>
  );
}
