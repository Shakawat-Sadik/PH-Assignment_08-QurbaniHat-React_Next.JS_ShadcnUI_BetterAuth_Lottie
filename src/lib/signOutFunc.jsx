import { TrashSimpleIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { eliteDateFormat } from "./utils";

const sonnerFunctionality = {
  description: eliteDateFormat(),
  action: {
    label: <TrashSimpleIcon size={24} />,
    onClick: () => {},
  },
};

export const signOutt = async () => {
  toast.success("Logged out successfully", sonnerFunctionality);
  setTimeout(async () => {
    const router = useRouter();
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }, 1000);
};
