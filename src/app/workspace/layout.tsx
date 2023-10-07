import { SidebarNav } from "@/components/layout/sidebar-nav";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { workspaceSidebarNavItems } from "@/constants";
import type { Metadata } from "next";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { FolderProvider } from "@/context/folder-navigation.context";

export const metadata: Metadata = {
  title: "Workspace",
  description:
    "Manage your workspace efficiently. Organize, collaborate, and securely access your resources.",
};

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <>
        <FolderProvider>
          <div className="space-y-6 py-10 pb-16">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Workspace</h2>
              <p className="text-muted-foreground">
                Explore and manage your files and folders in Drive. Organize,
                share, and access your data securely.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav items={workspaceSidebarNavItems} />
              </aside>
              <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
          </div>
        </FolderProvider>
      </>
    );
  } else {
    redirect("/auth/signin");
  }
}
