"use client";

import React from "react";
import { authClient, signOut } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { LoaderOne, LoaderThree, LoaderTwo } from "../../ui/loader";
import { CosmicButton } from "../../ui/cosmic-button";
import { useRouter } from "next/navigation";
import { GlassButton } from "../../ui/glass-button";
import { signOutt } from "@/lib/signOutFunc";
import loader from "@/components/dancing-polish.gif";

const SessionState = () => {
  const router = useRouter();
  const { data: uSession, isPending } = authClient.useSession();
  const { name, image } = uSession?.user ?? {};
  // console.log(uSession?.user);
  const [profilePopOut, setProfilePopOut] = React.useState(false);

  return isPending ? (
    <div className="flex-justify-center items-center gap-3">
      <Image src={loader} alt="Loading..." width={64} height={64} />
    </div>
  ) : uSession?.user ? (
    <div className="flex justify-center items-center gap-4">
      <div className="relative">
        <GlassButton
          onMouseEnter={() => setProfilePopOut(true)}
          onMouseLeave={() => setProfilePopOut(false)}
          className="flex flex-col items-center text p-6"
        >
          <Image
            src={image}
            alt={`${name?.split(" ")[name?.split(" ").length - 1]}'s avatar`}
            width={40}
            height={40}
            className="aspect-square rounded-full border-4 border-accent-foreground/25"
          ></Image>
        </GlassButton>
        {profilePopOut && (
          <div className="absolute top-full left-0 mt-2 bg-background border border-accent-foreground/25 rounded-md shadow-lg p-4">
            <Link href="/profile">
              <p className="text-lg font-bold">Profile</p>
            </Link>
          </div>
        )}
      </div>
      <GlassButton
        onClick={signOutt}
        className="flex flex-col items-center text p-6"
      >
        Log Out
      </GlassButton>
    </div>
  ) : (
    <div className="flex justify-center items-center gap-4">
      <GlassButton
        variant="primary"
        onClick={() => router.push("/auth/signin")}
        className=""
      >
        Log In
      </GlassButton>
      <GlassButton
        variant="primary"
        onClick={() => router.push("/auth/signup")}
        className=""
      >
        Sign Up
      </GlassButton>
    </div>
  );
};

export default SessionState;
