import { TrashIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (jsonDate) => {
  return new Date(jsonDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const eliteDateFormat = () => {
  const time = new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      second: "2-digit",
      minute: "2-digit",
    })
    .toLocaleLowerCase()
    .replace(" ", "");

  const weekDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const theDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${time} | ${weekDay} | ${theDate}`;
};

export const sonnerFunctionality = {
  description: eliteDateFormat(),
  action: {
    label: <TrashIcon size={16} />,
    onClick: () => {},
  },
};