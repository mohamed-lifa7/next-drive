"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import type { Session } from "next-auth";
export default function NextAuthProvider({
  session,
  children,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
