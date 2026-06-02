"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LazyMotion, domAnimation, m } from "motion/react";
import { AnimalContext } from "@/context/AnimalContextAPI";
import loader from "@/components/dancing-polish.gif";
import { Switch, SwitchThumb } from "../ui/switch";
import { Montserrat, Anek_Bangla } from "next/font/google";

const outsiderFont = Montserrat({ subsets: ["latin"] }); //inside className: ${outsiderFont.className}
const outsiderFontBN = Anek_Bangla({ subsets: ["bangla", "latin"] }); //inside className: ${outsideFontBN.className}

export function StatsCards({
  className,
  width = "w-[90vw] sm:w-70 md:w-80",
  height = "h-72 sm:h-84",
  images = ["/images/models/1.png", "/images/models/2.png"],
}) {
  const { showAnimals, loading } = React.useContext(AnimalContext);

  const [randNums, setRandNums] = React.useState(0);

  React.useEffect(() => {
    if (!showAnimals?.length) return;

    const timer = window.setTimeout(() => {
      setRandNums(Math.floor(Math.random() * showAnimals.length));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [showAnimals?.length, loading]);

  /**
      const [randNums, setRandNums] = React.useState(0);

      React.useEffect(() => {
        if (!showAnimals?.length) return;

        const timer = window.setTimeout(() => {
          setRandNums(Math.floor(Math.random() * showAnimals.length));
        }, 0);

        return () => window.clearTimeout(timer);
      }, [showAnimals.length]);
  */

  // const [randNums, setRandNums] = React.useState([0,1,2,3]);
  // const regenerate = () =>
  //   setRandNums(Array.from({length:4}, () => Math.floor(Math.random()*showAnimals.length)));
  // call regenerate() from a button or event handler

  const {
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
  } = showAnimals?.[randNums] ?? {};

  const [numBDById, setNumBDById] = React.useState({});

  const localeFor = (cardId) => numBDById[cardId] ?? "en-IN";

  const handleCardClick = (e) => {
    // Toggle locale for the specific card that was clicked
    const cardId = e.currentTarget?.dataset?.cardId;
    if (!cardId) return;
    setNumBDById((prev) => ({
      ...prev,
      [cardId]: prev[cardId] === "bn-BD" ? "en-IN" : "bn-BD",
    }));
  };

  console.log(showAnimals);
  console.log(randNums);

  return loading ? (
    <div className="min-h-screen flex justify-center items-center">
      <Image src={loader} alt="Loading..." width={64} height={64} />
    </div>
  ) : (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          `flex flex-wrap items-center justify-center gap-6 sm:gap-4 md:gap-0 px-4 py-4 ${outsiderFont.className}`,
          className,
        )}
      >
        {/* Card 1: Revenue */}
        <m.div
          className={cn(
            `relative z-10 ${width} ${height} bg-card rounded-[16px] p-5 flex flex-col justify-between hover:z-50 overflow-hidden border-8 border-card`,
          )}
          initial={{
            rotate: -3,
          }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <Image
            src={image}
            alt="Model"
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover -z-20"
          />
          <div className="flex justify-between items-center">
              <h2 className="text-border text-3xl sm:text-5xl font-semibold tracking-tighter text-shadow-lg text-shadow-foreground">
                {new Intl.NumberFormat(localeFor(id)).format(price)}
              </h2>
              <Switch data-card-id={id} onClick={handleCardClick} defaultChecked>
                <SwitchThumb className="group/thumb flex items-center justify-center">
                  {localeFor(id) === "bn-BD" ? (
                    <span
                      className={`size-fit text-xs group-data-checked/thumb:hidden ${outsiderFontBN.className}`}
                    >
                      ৳
                    </span>
                  ) : (
                    <span className="size-fit text-[0.625rem] leading-px group-data-unchecked/thumb:hidden">
                      Tk
                    </span>
                  )}
                </SwitchThumb>
              </Switch>
          </div>
          <div className="bg-border/40 p-1 rounded-md">
            <h4 className="font-bold text-base sm:text-lg leading-tight tracking-tighter text-shadow-lg text-shadow-border/50">
              {name}
            </h4>
            <div className="w-full h-px bg-border my-2"></div>
            <p className="text-xs sm:text-sm leading-tight tracking-tight max-w-[90%] text-shadow-lg text-shadow-border">
              {description}
            </p>
          </div>
        </m.div>

        {/* Card 2: Image Stats */}
        <m.div
          className={cn(
            `relative z-20 ${width} ${height} rounded-[16px] overflow-hidden border-8 border-card group hover:z-50`,
          )}
          initial={{
            rotate: 2,
            y: 1,
          }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <Image
            src={ randNums < 35 ? showAnimals?.[randNums+1].image : showAnimals?.[randNums-5].image}
            alt="Model"
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover -z-20"
          />
          <div className="flex justify-between items-center">
            <h2 className="text-border text-3xl sm:text-5xl font-semibold tracking-tighter text-shadow-lg text-shadow-foreground">
              {(() => {
                const id2 = randNums < 35 ? showAnimals?.[randNums+1]?.id : showAnimals?.[randNums-5]?.id;
                const price2 = randNums < 35 ? showAnimals?.[randNums+1]?.price : showAnimals?.[randNums-5]?.price;
                return new Intl.NumberFormat(localeFor(id2)).format(price2);
              })()}
            </h2>
            <Switch
              data-card-id={randNums < 35 ? showAnimals?.[randNums+1]?.id : showAnimals?.[randNums-5]?.id}
              onClick={handleCardClick}
              defaultChecked
            >
              <SwitchThumb className="group/thumb flex items-center justify-center">
                {(() => {
                  const id2 = randNums < 35 ? showAnimals?.[randNums+1]?.id : showAnimals?.[randNums-5]?.id;
                  return localeFor(id2) === "bn-BD" ? (
                    <span className={`size-fit text-xs group-data-checked/thumb:hidden ${outsiderFontBN.className}`}>
                      ৳
                    </span>
                  ) : (
                    <span className="size-fit text-[0.625rem] leading-px group-data-unchecked/thumb:hidden">Tk</span>
                  );
                })()}
              </SwitchThumb>
            </Switch>
          </div>
          <div className="bg-border/40 p-1 rounded-md">
            <h4 className="font-bold text-base sm:text-lg leading-tight tracking-tighter text-shadow-lg text-shadow-border/50">
              { randNums < 35 ? showAnimals?.[randNums+1].name : showAnimals?.[randNums-5].name}
            </h4>
            <div className="w-full h-px bg-border my-2"></div>
            <p className="text-xs sm:text-sm leading-tight tracking-tight max-w-[90%] text-shadow-lg text-shadow-border">
              { randNums < 35 ? showAnimals?.[randNums+1].description : showAnimals?.[randNums-5].description}
            </p>
          </div>
        </m.div>

        {/* Card 3: Impressions */}
        <m.div
          className={cn(
            `relative z-30 ${width} ${height} bg-[#FF4400] rounded-[16px] p-5 flex flex-col justify-between overflow-hidden border-8 border-card shrink-0 hover:z-50`,
          )}
          initial={{
            rotate: 8,
          }}
          whileHover={{
            rotate: 0,
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <Image
            src={ randNums < 35 ? showAnimals?.[randNums+2].image : showAnimals?.[randNums-15].image }
            alt="Model"
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover -z-20"
          />
          <div className="flex justify-between items-center">
            <h2 className="text-border text-3xl sm:text-5xl font-semibold tracking-tighter text-shadow-lg text-shadow-foreground">
              {(() => {
                const id3 = randNums < 35 ? showAnimals?.[randNums+2]?.id : showAnimals?.[randNums-15]?.id;
                const price3 = randNums < 35 ? showAnimals?.[randNums+2]?.price : showAnimals?.[randNums-15]?.price;
                return new Intl.NumberFormat(localeFor(id3)).format(price3);
              })()}
            </h2>
            <Switch
              data-card-id={randNums < 35 ? showAnimals?.[randNums+2]?.id : showAnimals?.[randNums-15]?.id}
              onClick={handleCardClick}
              defaultChecked
            >
              <SwitchThumb className="group/thumb flex items-center justify-center">
                {(() => {
                  const id3 = randNums < 35 ? showAnimals?.[randNums+2]?.id : showAnimals?.[randNums-15]?.id;
                  return localeFor(id3) === "bn-BD" ? (
                    <span className={`size-fit text-xs group-data-checked/thumb:hidden ${outsiderFontBN.className}`}>
                      ৳
                    </span>
                  ) : (
                    <span className="size-fit text-[0.625rem] leading-px group-data-unchecked/thumb:hidden">Tk</span>
                  );
                })()}
              </SwitchThumb>
            </Switch>
          </div>
          <div className="bg-border/40 p-1 rounded-md">
            <h4 className="font-bold text-base sm:text-lg leading-tight tracking-tighter text-shadow-lg text-shadow-border/50">
              { randNums < 35 ? showAnimals?.[randNums+2].name : showAnimals?.[randNums-15].name}
            </h4>
            <div className="w-full h-px bg-border my-2"></div>
            <p className="text-xs sm:text-sm leading-tight tracking-tight max-w-[90%] text-shadow-lg text-shadow-border">
              { randNums < 35 ? showAnimals?.[randNums+2].description : showAnimals?.[randNums-15].description }
            </p>
          </div>
        </m.div>

        {/* Card 4: Image Stats */}
        <m.div
          className={cn(
            `relative z-40 ${width} ${height} rounded-[16px] overflow-hidden border-8 border-card -ml-1 hover:z-50`,
          )}
          initial={{
            rotate: -4,
          }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <Image
            src={ randNums < 35 ? showAnimals?.[randNums+3].image : showAnimals?.[randNums-10].image }
            alt="Model"
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover -z-20"
          />
          <div className="flex justify-between items-center">
            <h2 className="text-border text-3xl sm:text-5xl font-semibold tracking-tighter text-shadow-lg text-shadow-foreground">
              {(() => {
                const id4 = randNums < 35 ? showAnimals?.[randNums+3]?.id : showAnimals?.[randNums-10]?.id;
                const price4 = randNums < 35 ? showAnimals?.[randNums+3]?.price : showAnimals?.[randNums-10]?.price;
                return new Intl.NumberFormat(localeFor(id4)).format(price4);
              })()}
            </h2>
            <Switch
              data-card-id={randNums < 35 ? showAnimals?.[randNums+3]?.id : showAnimals?.[randNums-10]?.id}
              onClick={handleCardClick}
              defaultChecked
            >
              <SwitchThumb className="group/thumb flex items-center justify-center">
                {(() => {
                  const id4 = randNums < 35 ? showAnimals?.[randNums+3]?.id : showAnimals?.[randNums-10]?.id;
                  return localeFor(id4) === "bn-BD" ? (
                    <span className={`size-fit text-xs group-data-checked/thumb:hidden ${outsiderFontBN.className}`}>
                      ৳
                    </span>
                  ) : (
                    <span className="size-fit text-[0.625rem] leading-px group-data-unchecked/thumb:hidden">Tk</span>
                  );
                })()}
              </SwitchThumb>
            </Switch>
          </div>
          <div className="bg-border/40 p-1 rounded-md">
            <h4 className="font-bold text-base sm:text-lg leading-tight tracking-tighter text-shadow-lg text-shadow-border/50">
              { randNums < 35 ? showAnimals?.[randNums+3].name : showAnimals?.[randNums-10].name}
            </h4>
            <div className="w-full h-px bg-border my-2"></div>
            <p className="text-xs sm:text-sm leading-tight tracking-tight max-w-[90%] text-shadow-lg text-shadow-border">
              { randNums < 35 ? showAnimals?.[randNums+3].description : showAnimals?.[randNums-10].description }
            </p>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
