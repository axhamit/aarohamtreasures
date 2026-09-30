"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

const AuthControls = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session?.user) {
    return (
      <Button onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
      Sign in
    </Button>
  );
};

export default AuthControls;
