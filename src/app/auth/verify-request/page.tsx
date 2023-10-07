import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Verify Request",
  description:
    "A sign-in link has been sent to your email address. Please check your email inbox and click the link to sign in",
};
const VerifyRequest = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <section className="grid h-[80vh] w-full place-content-center">
      <Card className="sm:">
        <CardHeader className="text-center">
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            A sign-in link has been sent to your email address. Please check
            your email inbox and click the link to sign in.
          </CardDescription>
          <CardContent>
            <p className="mb-4 mt-8 space-x-4 text-base">
              If you don&apos;t see the email in your inbox, please check your
              spam folder.
            </p>
            <Button asChild variant="outline">
              <Link href={"/"}>Continue to Homepage</Link>
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    </section>
  );
};

export default VerifyRequest;
