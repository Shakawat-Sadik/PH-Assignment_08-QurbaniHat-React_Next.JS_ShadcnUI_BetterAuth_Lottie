"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LazyMotion, domAnimation, m } from "motion/react";
import { AnimalContext } from "@/context/AnimalContextAPI";
import loader from "@/components/dancing-polish.gif";
import { Switch, SwitchThumb } from "./ui/switch";
import { Montserrat, Anek_Bangla } from "next/font/google";

const outsiderFont = Montserrat({ subsets: ["latin"] }); //inside className: ${outsiderFont.className}
const outsiderFontBN = Anek_Bangla({ subsets: ["bangla", "latin"] }); //inside className: ${outsideFontBN.className}

export function StatsCards({
  className,
  width = "w-70",
  height = "h-84",
  images = ["/images/models/1.png", "/images/models/2.png"],
}) {
    
    const { showAnimals, loading } = React.useContext(AnimalContext);
    
    const [randNums, setRandNums] = React.useState(0);

    React.useEffect(() => {
    setRandNums(() => Math.floor(Math.random() * showAnimals?.length));
    }, [loading]);
}