"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  EnvelopeSimple,
  MapPin,
  PhoneCall,
  YoutubeLogo,
} from "@phosphor-icons/react";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookLogo },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramLogo },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeLogo },
];

const Footer = ({ className }) => {
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
                <MapPin className="mt-0.5 size-4 text-primary" />
                <span>Bogura, Rajshahi Division, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="size-4 text-primary" />
                <a href="tel:+8801712345678" className="hover:text-foreground">+880 1712-345678</a>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeSimple className="size-4 text-primary" />
                <a href="mailto:support@qurbanihat.com" className="hover:text-foreground">support@qurbanihat.com</a>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Social links</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Button key={label} asChild variant="outline" size="sm" className="gap-2 rounded-full">
                  <a href={href} target="_blank" rel="noreferrer">
                    <Icon className="size-4" />
                    {label}
                    <ArrowUpRight className="size-4" />
                  </a>
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
          <p>© {new Date().getFullYear()} QurbaniHat. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/animals" className="hover:text-foreground">All Animals</Link>
            <Link href="/auth/signin" className="hover:text-foreground">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
