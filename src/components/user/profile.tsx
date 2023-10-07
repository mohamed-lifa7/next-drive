import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculatePercentage, convertSize } from "@/lib/firebase/helpers";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
const ProfileCard = (user: {
  name?: string | null;
  image?: string | null;
  totalStorage?: number;
}) => {
  const freePlanLimit = 500 * 1024 * 1024;
  const TotalStoragePercentage = calculatePercentage(
    user.totalStorage!,
    freePlanLimit,
  );
  const totalStorage = convertSize(user.totalStorage!);
  return (
    <>
      <Card className="w-64">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Active</span>
            <Button variant="link" asChild>
              <Link href="/workspace/settings">Eddit</Link>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid place-content-center">
          <Image
            src={user.image!}
            width={122}
            height={122}
            alt="Profile picture"
            className="rounded-full"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Progress value={TotalStoragePercentage} className="my-4" />
          <p className="">
            <span className="font-semibold text-muted-foreground">
              Storage:
            </span>{" "}
            <span>{TotalStoragePercentage}%</span>
          </p>
          <span>{totalStorage}</span>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProfileCard;
