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
      <div className="flex w-full items-center bg-[#50c895]/40 dark:bg-background/30 px-4 py-4 sm:px-6 sm:py-6 lg:px-10">
        <div className="z-20 flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-6">
            <Link href="/" className="text-3xl font-semibold">
              <Image
                loading="eager"
                src={qurbani}
                alt="logo"
                width="100"
                height="80"
                className="h-12 w-auto sm:h-16"
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
          <div className="flex w-full items-center justify-center md:w-auto md:justify-end">
            <SessionState />
          </div>
          <nav className="flex flex-wrap justify-center gap-4 text-sm md:hidden">
            <Link href="/" className="font-semibold text-accent-foreground">
              Home
            </Link>
            <Link href="/animals" className="font-semibold text-accent-foreground">
              All Animals
            </Link>
          </nav>
        </div>
      </div>
      <div className="w-full absolute top-0 left-0 right-0 -mt-px h-full">
        <DistortedGlass className="h-full" />
      </div>
    </div>
  );
};

export default Navbar;
