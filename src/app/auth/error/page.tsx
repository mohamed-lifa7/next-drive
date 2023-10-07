import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Authentication Error",
  description:
    "Oops! There was an authentication error while trying to access this page. Please check your credentials and try again.",
};
const AuthError = () => {
  return (
    <section className="grid h-[80vh] w-full place-content-center">
      <div className="text-center">
        <div className="mb-4 flex items-center space-x-4 text-lg">
          <span className="font-system font-bold">401</span>
          <Separator className="h-8 " orientation="vertical" />
          <span>Authentication Error</span>
        </div>
        <Button asChild variant="outline">
          <Link href={"/"}>Go Back Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default AuthError;
