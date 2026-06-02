"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ArrowFatLineDownIcon,
  ArrowFatLineUpIcon,
  ArrowRightIcon,
  ArrowsClockwiseIcon,
  CaretDownIcon,
  ChatsIcon,
  PhoneCallIcon,
  VideoConferenceIcon,
} from "@phosphor-icons/react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

export default function AnimalCard({ animals }) {
  const [sortState, setSortState] = useState({
    type: "normal",
    direction: "asc",
  });

  const sortedAnimals = useMemo(() => {
    const sortAnimals = [...animals];

    if (sortState.type === "price") {
      sortAnimals.sort((a, b) => {
        if (sortState.direction === "asc") {
          return a.price - b.price;
        } else if (sortState.direction === "desc") {
          return b.price - a.price;
        }
      });
    }
    if (sortState.type === "location") {
      sortAnimals.sort((a, b) => {
        if (sortState.direction === "asc") {
          return a.location.localeCompare(b.location);
        } else if (sortState.direction === "desc") {
          return b.location.localeCompare(a.location);
        }
      });
    }

    return sortAnimals;
  }, [animals, sortState]);

  const handleSort = (type, sortDirection) => {
    setSortState({ type, direction: sortDirection });
  };

  const handleTypeFilter = (type) => {
    if (type === "all") {
      setSortState({ type: "normal", direction: "asc" });
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <DropdownMenu className="relative">
        <DropdownMenuTrigger
          render={
            <Button className="flex flex-row items-center cursor-pointer">
              <span>Sort by</span>
              <CaretDownIcon
                className="relative top-px ml-1 size-3 transition duration-300"
                aria-hidden="true"
              />
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuPositioner className="left-0">
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Price</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() => handleSort("price", "asc")}
                onClick={() => handleSort("price", "asc")}
              >
                Ascending{" "}
                <DropdownMenuShortcut>
                  <ArrowFatLineUpIcon size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("price", "desc")}
                onClick={() => handleSort("price", "desc")}
              >
                Descending{" "}
                <DropdownMenuShortcut>
                  <ArrowFatLineDownIcon size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Location</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() => handleSort("location", "asc")}
                onClick={() => handleSort("location", "asc")}
              >
                Ascending{" "}
                <DropdownMenuShortcut>
                  <ArrowFatLineUpIcon size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("location", "desc")}
                onClick={() => handleSort("location", "desc")}
              >
                Descending{" "}
                <DropdownMenuShortcut>
                  <ArrowFatLineDownIcon size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => handleSort("normal")}
              onClick={() => handleSort("normal")}
            >
              Reset
              <DropdownMenuShortcut>
                <ArrowsClockwiseIcon size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPositioner>
      </DropdownMenu>
      <div className="grid w-full h-full flex-1 grid-cols-1 gap-4 px-2 py-4 sm:grid-cols-2 sm:gap-5 sm:px-4 lg:grid-cols-3 xl:grid-cols-4">
        {sortedAnimals.map(
          ({
            id,
            name,
            type,
            breed,
            price,
            weight,
            weightUnit,
            age,
            ageUnit,
            gender,
            color,
            location,
            division,
            description,
            image,
            images,
            category,
            healthStatus,
          }) => (
            <div key={id} className="h-full flex-1 w-full rounded-lg p-2 sm:p-4 m-2 sm:m-4">
              <Card className="relative mx-auto w-full h-full overflow-hidden border-0 pt-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative">
                  <Image
                    src={image}
                    alt={name}
                    width={600}
                    height={400}
                    className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
                  />
                  <span className="absolute bottom-2 left-2 z-40 text-xl text-card font-black">
                    {currency.format(price)}
                  </span>
                </div>
                <CardHeader className="flex-1">
                  <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                  </CardAction>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>
                    {description.length > 135
                      ? description.substring(0, 135) + "..."
                      : description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start">
                  <Button asChild>
                    <Link href={`/animals/${id}`}>
                      Details
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
/*
// <Card className="group overflow-hidden border-border/60 bg-card/80 p-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//   <CardHeader className="p-0">
//     <div className="relative aspect-4/3 overflow-hidden">
//       <Image
//         src={image}
//         alt={name}
//         fill
//         className="object-cover transition-transform duration-500 group-hover:scale-105"
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//       />
//       <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />
//       <div className="absolute left-4 top-4 flex flex-wrap gap-2">
//         <Badge variant="secondary" className="bg-black/55 text-white backdrop-blur">
//           {type}
//         </Badge>
//         {category ? <Badge className="bg-primary text-primary-foreground">{category}</Badge> : null}
//       </div>
//       {isVerified ? (
//         <Badge
//           variant="outline"
//           className="absolute right-4 top-4 border-white/30 bg-white/15 text-white backdrop-blur"
//         >
//           Verified
//         </Badge>
//       ) : null}
//     </div>
//   </CardHeader>

//   <CardContent className="space-y-4 p-5">
//     <div className="space-y-1">
//       <CardTitle className="text-xl text-foreground">{name}</CardTitle>
//       <CardDescription className="text-sm text-muted-foreground">
//         {breed} breed, {division || location}
//       </CardDescription>
//     </div>

//     <div className="flex flex-wrap gap-2 text-xs">
//       {healthStatus ? <Badge variant="outline">{healthStatus}</Badge> : null}
//       <Badge variant="outline">{weight} {weightUnit}</Badge>
//       <Badge variant="outline">{age} {ageUnit}</Badge>
//     </div>

//     <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
//       {description}
//     </p>

//     <div className="flex items-end justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
//       <div>
//         <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Price</p>
//         <p className="mt-1 text-2xl font-bold text-foreground">
//           {currency.format(price)}
//         </p>
//       </div>
//       <div className="text-right text-sm text-muted-foreground">
//         <p>{location}</p>
//         <p>{division}</p>
//       </div>
//     </div>
//   </CardContent>

//   <CardFooter className="flex items-center justify-between gap-3 p-5 pt-0">
//     <Button asChild className="w-full">
//       <Link href={`/animals/${id}`}>
//         Details
//         <ArrowRight className="size-4" />
//       </Link>
//     </Button>
//   </CardFooter>
// </Card>

*/
