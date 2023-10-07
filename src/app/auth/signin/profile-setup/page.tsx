import type { Metadata } from "next";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileSetup } from "@/components/auth/user-auth-form";
export const metadata: Metadata = {
  title: "Profile Setup",
  description:
    "Complete your profile setup on Next Drive, your secure cloud storage.",
};

export default async function ProfileSetupPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  } else if (session.user.name && session.user.image) {
    redirect("/");
  }
  return (
    <>
      <div className="relative flex-col items-center justify-center">
        <div className="lg:p-8">
          <ProfileSetup />
        </div>
      </div>
    </>
  );
}
