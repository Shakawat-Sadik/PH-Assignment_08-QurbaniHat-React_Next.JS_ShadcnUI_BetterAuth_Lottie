"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneCallIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import loader from "@/components/dancing-polish.gif";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookLogoIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramLogoIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeLogoIcon },
];


const Footer = ({ className }) => {
  const { data: uSession, isPending } = authClient.useSession();
  console.log(uSession);
  return (
    <footer className={cn("mt-auto border-t border-border/60 bg-background/90", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <section className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">QurbaniHat</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">Livestock booking made simple</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              A modern livestock marketplace where families can discover healthy,
              verified animals for Qurbani and book with confidence after signing in.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-4 text-primary" />
                <span>Kushtia, Khulna Division, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCallIcon className="size-4 text-primary" />
                <a href="tel:+8801712345678" className="hover:text-foreground">+880 1712-345678</a>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeSimpleIcon className="size-4 text-primary" />
                <a href="mailto:support@qurbanihat.com" className="hover:text-foreground">support@qurbanihat.com</a>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Social links</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Button key={label} asChild variant="primary" size="sm" className="gap-2 rounded-full hover:bg-card hover:text-foreground">
                  <Link href={href} target="_blank" rel="noreferrer">
                    <Icon className="size-4" />
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Follow for new listings, seasonal tips, and Qurbani readiness updates.
            </p>
          </section>
        </div>

        <Separator className="my-8 bg-border/70" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} QurbaniHat. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/animals" className="hover:text-foreground">All Animals</Link>
            {
              isPending? <Image src={loader} alt="loading..." width={24} height={24} /> : uSession ? <Link href="/profile" className="border hover:border-primary hover:bg-primary rounded-full aspect-square overflow-hidden">
                <Image src={uSession.user.image} alt="Profile" width={24} height={24} />
              </Link> : <Link href="/auth/signin" className="hover:text-foreground">Login</Link>
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
