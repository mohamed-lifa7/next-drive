import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm, SignUpForm } from "@/components/auth/user-auth-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in securely to access your cloud storage with Next Drive. Protect your data and enjoy hassle-free storage.`,
};

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <div className="relative flex-col items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col justify-center space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In to Next Drive
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back! Please sign in to access your cloud storage
                account.
              </p>
            </div>
            <div className="w-full">
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sing in</TabsTrigger>
                  <TabsTrigger value="signup">New Account</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <SignInForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
