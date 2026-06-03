import { TrashSimpleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { eliteDateFormat } from "./utils";

const sonnerFunctionality = {
  description: eliteDateFormat(),
  action: {
    label: <TrashSimpleIcon size={24} />,
    onClick: () => {},
  },
};

export const signOutt = async (router) => {
  toast.success("Logged out successfully", sonnerFunctionality);
  setTimeout(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
        },
      },
    });
  }, 1000);
};
