"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

const CarouselContext = React.createContext(null);

function useCarouselContext() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("Carousel components must be used within <Carousel />");
  }

  return context;
}

function Carousel({ className, children }) {
  const viewportRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const itemCount = React.useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type?.displayName === "CarouselItem",
      ).length,
    [children],
  );

  const scrollToIndex = React.useCallback((index) => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const nextIndex = Math.max(0, Math.min(index, itemCount - 1));
    const target = viewport.children[nextIndex];

    if (target) {
      target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  }, [itemCount]);

  const scrollByDelta = React.useCallback((delta) => {
    scrollToIndex(activeIndex + delta);
  }, [activeIndex, scrollToIndex]);

  const onScroll = React.useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport || itemCount === 0) return;

    const left = viewport.scrollLeft;
    const width = viewport.clientWidth || 1;
    const nextIndex = Math.round(left / width);

    setActiveIndex(Math.max(0, Math.min(nextIndex, itemCount - 1)));
  }, [itemCount]);

  const contextValue = React.useMemo(
    () => ({
      viewportRef,
      activeIndex,
      itemCount,
      scrollToIndex,
      scrollByDelta,
    }),
    [activeIndex, itemCount, scrollByDelta, scrollToIndex],
  );

  const itemChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type?.displayName === "CarouselItem",
  );
  const controlChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type?.displayName !== "CarouselItem",
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={cn("relative", className)}>
        <div
          ref={viewportRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl"
        >
          {itemChildren}
        </div>
        {controlChildren}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselItem({ className, children }) {
  return (
    <div
      className={cn("min-w-full snap-start shrink-0 p-4", className)}
    >
      {children}
    </div>
  );
}

function CarouselPrevious({ className }) {
  const { scrollByDelta, itemCount } = useCarouselContext();

  if (itemCount <= 1) return null;

  return (
    <button
      type="button"
      aria-label="Previous slide"
      onClick={() => scrollByDelta(-1)}
      className={cn(
        "absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/90 p-2 shadow-sm backdrop-blur hover:bg-background",
        className,
      )}
    >
      <CaretLeftIcon size={16} />
    </button>
  );
}

function CarouselNext({ className }) {
  const { scrollByDelta, itemCount } = useCarouselContext();

  if (itemCount <= 1) return null;

  return (
    <button
      type="button"
      aria-label="Next slide"
      onClick={() => scrollByDelta(1)}
      className={cn(
        "absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-background/90 p-2 shadow-sm backdrop-blur hover:bg-background",
        className,
      )}
    >
      <CaretRightIcon size={16} />
    </button>
  );
}

function CarouselDots({ className }) {
  const { activeIndex, itemCount, scrollToIndex } = useCarouselContext();

  if (itemCount <= 1) return null;

  return (
    <div className={cn("mt-4 flex justify-center gap-2", className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={activeIndex === index}
          onClick={() => scrollToIndex(index)}
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-all",
            activeIndex === index ? "bg-foreground" : "bg-foreground/25 hover:bg-foreground/50",
          )}
        />
      ))}
    </div>
  );
}

CarouselItem.displayName = "CarouselItem";
CarouselPrevious.displayName = "CarouselPrevious";
CarouselNext.displayName = "CarouselNext";
CarouselDots.displayName = "CarouselDots";

export {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};