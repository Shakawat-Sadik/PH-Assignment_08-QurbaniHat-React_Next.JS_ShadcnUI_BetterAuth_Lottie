import { useRouter } from "next/navigation";

export const signOutt = async () => {
  toast.success("Logged out successfully");
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
