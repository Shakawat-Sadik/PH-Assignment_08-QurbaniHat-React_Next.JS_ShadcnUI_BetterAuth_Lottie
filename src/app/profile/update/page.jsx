"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { TrashSimpleIcon } from "@phosphor-icons/react";
import { eliteDateFormat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UpdateProfilePage = () => {
  const { data: uSession } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = React.useState(uSession?.user?.name || "");
  const [image, setImage] = React.useState(uSession?.user?.image || "");

  const sonnerFunctionality = {
    description: eliteDateFormat(),
    action: {
      label: <TrashSimpleIcon size={24} />,
      onClick: () => {},
    },
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;

    await authClient.updateUser(
      {
        name: name,
        image: image,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!", sonnerFunctionality);
          setTimeout(() => {
            setName("");
            setImage("https://res.cloudinary.com/sadik-store/image/upload/v1779291140/avatar_my9zov.png");
            router.refresh();
            router.push("/profile");
          }, 1500);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-base-100 shadow-xl rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Update Your Info</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <fieldset className="border border-gray-300 rounded-lg px-3 pb-1">
          <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase">
            New Name
          </legend>
          <input
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent"
            required
          />
        </fieldset>

        <fieldset className="border border-gray-300 rounded-lg px-3 pb-1">
          <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase">
            New Photo URL
          </legend>
          <input
            name="image"
            onChange={(e) => setImage(e.target.value || "https://res.cloudinary.com/sadik-store/image/upload/v1779291140/avatar_my9zov.png")}
            placeholder="Enter Photo URL"
            className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent"
          />
        </fieldset>

        <Button variant="destructive" type="submit" className=" w-full shadow-md">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
