"use client";
import { signIn } from "next-auth/react";
import React from "react";

const SignIn = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="text-sm font-semibold hover:text-darkColor text-lightColor hover:cursor-pointer hoverEffect"
    >
      Login
    </button>
  );
};

export default SignIn;
