"use client";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
} from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import loader from "@/components/dancing-polish.gif";

const ProfilePage = () => {
  const { data: uSession, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Image src={loader} alt="Loading..." width={64} height={64} />
      </div>
    );
  }

  if (!uSession) {
    router.push("/login");
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <GlassCard glowEffect={false} className="border-border/40">
        <GlassCardHeader className="flex flex-col items-center gap-4">
          <div className="rounded-full overflow-hidden ring-2 ring-primary/30">
            <Image
              src={uSession?.user.image || "https://res.cloudinary.com/sadik-store/image/upload/v1779291140/avatar_my9zov.png"}
              alt="Profile"
              width={160}
              height={160}
              priority
              className="object-cover"
            />
          </div>
          <GlassCardTitle className="text-2xl text-foreground font-bold">
            {uSession.user.name}
          </GlassCardTitle>
          <GlassCardDescription className="text-sm text-foreground/80">
            {uSession.user.email}
          </GlassCardDescription>
        </GlassCardHeader>

        <GlassCardContent>
          <p className="text-sm text-foreground/80">
            Welcome to your profile. Use the button below to update your display
            name or profile photo.
          </p>
        </GlassCardContent>

        <GlassCardFooter className="pt-0">
          <Link href="/profile/update" className="w-full flex justify-center">
            <Button className="bg-card text-foreground" variant="secondary">
              Update Information
            </Button>
          </Link>
        </GlassCardFooter>
      </GlassCard>
    </div>
  );
};

export default ProfilePage;
