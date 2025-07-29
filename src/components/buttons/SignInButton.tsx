"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

const SignInButton = () => {
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  return (
    <Button
      variant="default"
      className="cursor-pointer"
      onClick={async () => {
        setIsSignInLoading(true);
        await signIn("rauth", {
          redirectTo: "/profile",
          // redirect: false,
        });
        // push("/profile");
      }}
      spinner={isSignInLoading}
      disabled={isSignInLoading}
      size="sm"
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
