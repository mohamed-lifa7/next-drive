"use client";

import { useSession } from "next-auth/react";

const WhoAmI = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p>you are {session ? session.user.name : "Not Logged in"}</p>
    </div>
  );
};

export default WhoAmI;
