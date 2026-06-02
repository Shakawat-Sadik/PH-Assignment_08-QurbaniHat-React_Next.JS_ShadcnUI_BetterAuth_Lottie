"use client";

import React from "react";
import { DistortedGlass } from "../ui/distorted-glass";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";
import Image from "next/image";
import qurbani from "../../../public/slazzer-preview-6ovgl.png";
import SessionState from "./Navbar/Session_topright";

const Navbar = ({ className }) => {
  
  return (
    <div
      className={cn(
        "relative rounded-lg bg-transparent overflow-hidden",
        className,
      )}
    >
      <div className="flex h-full items-center bg-[#50c895]/40 dark:bg-background/30 py-6 px-10">
        <div className="flex flex-1 items-center justify-between z-20">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-3xl font-semibold">
              <Image
                loading="eager"
                src={qurbani}
                alt="logo"
                width="100"
                height="80"
              />
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                href="/"
                className="text-xl text-accent-foreground font-semibold"
              >
                Home
              </Link>
              <Link
                href="/animals"
                className="text-xl text-accent-foreground font-semibold"
              >
                All Animals
              </Link>
            </nav>
          </div>
          <div>
            <SessionState />
          </div>
        </div>
      </div>
      <div className="w-full absolute top-0 left-0 right-0 -mt-px h-full">
        <DistortedGlass className="h-full" />
      </div>
    </div>
  );
};

export default Navbar;
