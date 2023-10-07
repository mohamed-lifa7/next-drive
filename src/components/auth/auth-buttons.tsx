"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      {!session ? (
        <Button variant="default" asChild>
          <Link href="/auth/signin" aria-label="Sign in">
            Sign in
          </Link>
        </Button>
      ) : (
        <Button
          aria-label="Sign out"
          variant="secondary"
          onClick={() => {
            void signOut({
              callbackUrl: "/",
              redirect: false,
            });
            router.push("/");
          }}
        >
          Sign out
        </Button>
      )}
    </>
  );
};

const GetStartedButtons = () => {
  const { data: session } = useSession();
  return (
    <>
      <Button
        variant="default"
        asChild
        className="mr-2"
        aria-label="Get started"
      >
        <Link href={session?.user ? "/workspace" : "/auth/signin"}>
          Get started
        </Link>
      </Button>
    </>
  );
};

export { AuthButtons, GetStartedButtons };
