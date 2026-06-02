"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VISIBLE_COUNT = 5;
const RADIUS_X = 220;
const RADIUS_Y = 100;

function getItemPosition(index, activeIndex, total) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * RADIUS_X;
  const y = -Math.cos(angle) * RADIUS_Y;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

function priorityClasses(priority) {
  switch (priority) {
    case "Essential":
      return "from-rose-500/25 via-rose-500/10 to-card/60";
    case "High":
      return "from-amber-400/25 via-amber-400/10 to-card/60";
    case "Recommended":
      return "from-emerald-400/20 via-emerald-400/10 to-card/60";
    case "Sunnah":
      return "from-sky-400/20 via-sky-400/10 to-card/60";
    default:
      return "from-card/80 via-card/60 to-secondary/50";
  }
}

export default function GoruCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}){
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  useEffect(() => {
    if (!selectedItem) return;
    const handler = (e) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedItem]);

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "p-6 relative flex flex-col items-center justify-center gap-8 outline-none",
        className,
      )}
    >
      {/* Circular track */}
      <div className="relative h-70 w-full max-w-lg">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total);
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  goTo(i);
                  setSelectedItem(item);
                }}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-40 w-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start gap-3 rounded-2xl border border-border/30 bg-linear-to-b p-4 backdrop-blur-sm transition-shadow duration-300",
                  priorityClasses(item.priority),
                  isActive
                    ? "shadow-[0_24px_70px_-18px_rgba(0,0,0,0.55)]"
                    : "shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.45)]",
                )}
                style={{ transformOrigin: "center center" }}
              >
                <div className="flex w-full items-center gap-2">
                  {item.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-popover/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.priority && (
                    <span className="ml-auto rounded-full border border-border/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/70">
                      {item.priority}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <h3
                    className={cn(
                      "text-left font-semibold leading-tight transition-colors duration-300",
                      isActive ? "text-foreground text-2xl" : "text-foreground/80 text-lg",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 line-clamp-2 text-left text-xs leading-relaxed transition-colors duration-300",
                      isActive ? "text-muted-foreground" : "text-muted-foreground/80",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Center content */}
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <span className="text-5xl font-bold tracking-tight text-foreground">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          of {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 glass-effect bg-black/40"
            onClick={() => setSelectedItem(null)}
            role="button"
            tabIndex={0}
            aria-label="Close details"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedItem(null);
            }}
          />
          <div
            className={cn(
              "relative z-10 w-full max-w-xl rounded-3xl border border-border/40 bg-linear-to-b p-6 shadow-2xl backdrop-blur-lg",
              priorityClasses(selectedItem.priority),
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-popover/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {selectedItem.priority && (
                <span className="ml-auto rounded-full border border-border/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  {selectedItem.priority}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-foreground">
              {selectedItem.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {selectedItem.description}
            </p>
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-6 rounded-full border border-border/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground/70 transition-colors hover:bg-popover/20"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 bg-popover/5 text-foreground/70 backdrop-blur-sm transition-colors hover:bg-popover/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted/50 hover:bg-muted/70",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Next item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 bg-popover/5 text-foreground/70 backdrop-blur-sm transition-colors hover:bg-popover/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}