"use client";

import { LoaderFive, LoaderFour, LoaderThree } from "@/components/ui/loader";
import { Label } from "@/components/ui/label";
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardFooter,
} from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EyeIcon, UserIcon } from "@phosphor-icons/react";

const SignInPage = () => {

  const {data: uSession, isPending} = authClient.useSession();
  const {user} = uSession ?? {};
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [visPass, setVisPass] = useState(false);
  
  const handleForm = async (e) => {
    e.preventDefault();
    const ct = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(ct);
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: true,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          router.back() || router.push("/");
        },
        onError: (error) => {
          setIsLoading(false);
          console.error(error);
        },
      }
    );
    console.log(data, error);
  };
  console.log(user?.name);
  
  const handleGLogin = async (e) => {
    console.log(e.currentTarget); //Gotta learn useRef then I'll get back and create an overlay stating `Logging you in...` if used credential, `Googling you in...` if used Google sign in.
    const data = await authClient.signIn.social(
      {
        provider: "google",
        // callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsLoading(true);
          //   div.absolute.bg-background
        },
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
        },
        onError: (error) => {
          setIsLoading(false);
          console.error(error);
        },
      },
    );
  };

  return (
      isPending? (
              <div className="flex  min-h-full flex-1 flex-col justify-center items-center h-full w-full">
                  <Spinner />
              </div>
          ) :
      user ? 
      (<div className="flex min-h-full flex-1 flex-col justify-center items-center gap-10">
        <h2 className="text-6xl">
          You&apos;re logged in already {user && `as ${user?.name}`}
        </h2>
        <Button onClick={() => router.back()}>Let&apos;s Go Back</Button>
      </div> )
      :
      (
        <div className="flex min-h-full flex-1 items-center justify-center bg-primary/10 px-4 py-6">
      {isLoading && (
        <div className="absolute inset-0 z-100 flex items-center justify-center">
          <div className="z-50 h-full w-full glass-effect bg-(--glass-effect-bg) size-full text-2xl" />
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none text-3xl">
            <LoaderFive text="Logging in shortly..." />
          </div>
        </div>
      )}

      <GlassCard className="w-full max-w-md">
        <GlassCardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-full bg-primary">
              <UserIcon size={32} />
            </div>
          </div>
          <GlassCardTitle className="text-foreground text-xl">Sign into your account</GlassCardTitle>
          <GlassCardDescription className="text-foreground">Welcome! Please fill in the details to get started.</GlassCardDescription>
        </GlassCardHeader>

        <GlassCardContent>
          <div className="flex justify-center gap-2 mb-4">
            <GlassButton onClick={handleGLogin} variant="outline" className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className="h-4 w-4">
                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
              </svg>
              <span className="text-accent-foreground pl-2">Google</span>
            </GlassButton>
          </div>

          <div className="flex justify-around items-center gap-8 m-5">
            <hr className="border border-card/75 w-full" />
            <span className="flex text-center text-sm text-card">Or</span>
            <hr className="border border-card/75 w-full" />
          </div>

          <form id="signin" onSubmit={handleForm} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
              <GlassInput id="email" type="email" name="email" required className="placeholder:text-accent-foreground bg-accent-foreground" />
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="password" className="text-sm text-foreground">Password</Label>
              <GlassInput id="password" type={ visPass? "text" : "password" } name="password" required className=" placeholder:text-accent-foreground bg-accent-foreground" />
              <EyeIcon onClick={() => setVisPass(!visPass)} size={16} className="cursor-pointer hover:scale-102 absolute top-10 right-2.5" />
            </div>
          </form>
        </GlassCardContent>

        <GlassCardFooter className="flex items-center justify-center">
          <GlassButton type="submit" form="signin" variant="primary" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="h-4 w-4 rounded-full text-secondary border-2 border-white/30 border-t-white animate-spin mr-2" />
              </>
            ) : (
              <>Log In</>
            )}
          </GlassButton>
        </GlassCardFooter>

        <div className="bg-primary/10 pt-px rounded-b-[20px] overflow-hidden">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-center text-sm text-foreground">
              Don&apos;t have any account? <Link href="/auth/signup" className="text-card font-bold"> Sign Up</Link>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
      )
  );
};

export default SignInPage;
