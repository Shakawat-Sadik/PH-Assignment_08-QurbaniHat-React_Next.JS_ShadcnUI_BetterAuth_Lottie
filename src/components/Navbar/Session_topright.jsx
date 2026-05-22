"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const SessionState = () => {
  const { data: uSession } = authClient.useSession();
  console.log(uSession?.user);
  return (
    <div className="flex justify-center items center gap-4">
      <Link href="/auth/signin">
        <button className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground z-20">
          Log In
        </button>
      </Link>
      <Link href="/auth/signup">
        <button className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground z-20">
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default SessionState;
