import ProfileCard from "@/components/user/profile";
import { getUserTotalStorage } from "@/lib/firebase/user-utils";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    const userTotalStorage = await getUserTotalStorage(session.user.email!);
    return (
      <>
        <div className="my-6 grid place-content-center">
          <ProfileCard
            name={session?.user.name}
            image={session?.user.image}
            totalStorage={userTotalStorage!}
          />
        </div>
      </>
    );
  } else {
    redirect("/auth/signin");
  }
};

export default Profile;
