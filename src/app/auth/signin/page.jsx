"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderFive } from "@/components/ui/loader";
import { TextureButton } from "@/components/ui/texture-button";
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "@/components/ui/texture-card";
import { authClient } from "@/lib/auth-client";
import { ArrowRightIcon, UserPlusIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    const ct = new FormData(e.currentTarget);
    const { email, name, username, password, directImage, avatar } =
      Object.fromEntries(ct);
    console.log(directImage);
    console.log(avatar);
    const { data, error } = await authClient.signIn.email(
      {
        username,
        password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsLoading(true);
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
    console.log(data, error);
  };

  const handleGLogin = async (e) => {
    console.log(e.currentTarget); //Gotta learn useRef then I'll get back and create an overlay stating `Logging you in...` if used credential, `Googling you in...` if used Google sign in.
    const data = await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
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
    <div className="flex items-center justify-center py-4">
      <div className=" dark:bg-stone-950 h-full rounded-md w-[50%]">
        <div className="items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid grid-cols-1 ">
          <div className="col-span-1 grid items-start gap-6 lg:col-span-2">
            <div>
              <TextureCardStyled>
                <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-4">
                  <div className="p-3 bg-background rounded-full mb-3">
                    <UserPlusIcon
                      size={32}
                      className="h-7 w-7 stroke-neutral-200"
                    />
                  </div>
                  <TextureCardTitle>Sign into your account</TextureCardTitle>
                  <p className="text-center">
                    Welcome! Please fill in the details to get started.
                  </p>
                </TextureCardHeader>
                <TextureSeparator />
                <TextureCardContent>
                  <div className="flex justify-center gap-2 mb-4">
                    <TextureButton
                      onClick={handleGLogin}
                      variant="icon"
                      className=""
                    >
                      {/* Google Icon */}
                      <svg
                        width="256"
                        height="262"
                        viewBox="0 0 256 262"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        className="h-5 w-5"
                      >
                        <path
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          fill="#4285F4"
                        />
                        <path
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          fill="#34A853"
                        />
                        <path
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          fill="#FBBC05"
                        />
                        <path
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          fill="#EB4335"
                        />
                      </svg>
                      {isLoading ? (
                        <LoaderFive text="Logging you in..." />
                      ) : (
                        <span className="pl-2">Google</span>
                      )}
                    </TextureButton>
                  </div>
                  <div className="flex justify-around items-center gap-8 m-5">
                    <hr className="border w-full" />
                    <span className="flex text-center text-sm">Or</span>
                    <hr className="border w-full" />
                  </div>

                  <form
                    id="signin"
                    onSubmit={handleForm}
                    className="max-h-screen flex justify-center text-base gap-6"
                  >
                    <div className="flex flex-col items-center w-full gap-6 p-10">
                      <div className="flex flex-col items-start gap-2 w-[60%]">
                        <Label htmlFor="username" className="text-base">
                          Username
                        </Label>
                        <Input
                          id="username"
                          type="text"
                          name="username"
                          required
                          className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-2 w-[60%]">
                        <Label htmlFor="password" className="text-base">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          name="password"
                          required
                          className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 placeholder-neutral-400 dark:placeholder-neutral-500"
                        />
                      </div>
                    </div>
                  </form>
                </TextureCardContent>
                <TextureSeparator />
                <TextureCardFooter className="flex items-center justify-center border-b rounded-b-sm">
                  <TextureButton
                    type="submit"
                    form="signin"
                    variant="accent"
                    className="w-[50%]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoaderFive text="Logging you in..." />
                    ) : (
                      <div className="flex gap-1 items-center justify-center text-xl font-bold">
                        Sign In
                        <ArrowRightIcon
                          size={32}
                          className="h-4 w-4 text-neutral-50 mb-0.5"
                        />
                      </div>
                    )}
                  </TextureButton>
                </TextureCardFooter>

                <div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden ">
                  <div className="flex flex-col items-center justify-center">
                    <div className="py-2 px-2">
                      <div className="text-center text-sm">
                        Don&apos;t have any account?
                        <Link href="/auth/signup" className="text-primary">
                          {" "}
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                  <TextureSeparator />
                </div>
              </TextureCardStyled>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
