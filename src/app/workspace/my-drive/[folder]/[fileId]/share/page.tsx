import { Separator } from "@/components/ui/separator";
import { fetchFile } from "@/lib/firebase/file-utils";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ShareFileForm from "@/components/others/share-file-form";

const ShareFilePage = async ({
  params,
}: {
  params: { folder: string; fileId: string };
}) => {
  const session = await getServerSession(authOptions);
  if (session?.user.email) {
    const file = await getData(params.fileId);
    return (
      <>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Share Your File</h3>
            <p className="text-sm text-muted-foreground">
              Customize sharing settings for your file and collaborate
              seamlessly with others.
            </p>
          </div>
          <Separator />
          <div>
            <ShareFileForm fileId={params.fileId} />
            <div className="my-2 flex w-full items-center justify-between">
              <div className="flex items-center space-x-4 ">
                <Avatar>
                  <AvatarImage src={session.user.image!} />
                  <AvatarFallback>
                    <User2Icon />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {session.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>
              <Badge>Owner</Badge>
            </div>

            {file?.sharedWith?.map((sharedWithUser) => (
              <div
                key={sharedWithUser}
                className="my-2 flex w-full items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-muted-foreground">
                    {sharedWithUser}
                  </p>
                </div>
                <Badge variant="secondary">Shared User</Badge>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default ShareFilePage;
const getData = async (id: string) => {
  const file = await fetchFile(id);
  return file;
};
