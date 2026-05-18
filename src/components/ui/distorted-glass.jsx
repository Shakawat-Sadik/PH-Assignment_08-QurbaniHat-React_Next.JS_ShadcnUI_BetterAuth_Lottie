"use client"

import { cn } from "@/lib/utils"

export const DistortedGlass = ({
  className
}) => {
  return (
    <>
      <div
        className={cn(
          "relative hidden h-[8vw] w-90 overflow-hidden rounded-b-2xl lg:w-150 xl:block xl:w-full",
          className
        )}>
        <div
          className="pointer-events-none absolute bottom-0 z-10 size-full overflow-hidden rounded-b-2xl  border border-[#f5f5f51a]">
          <div className="glass-effect bg-(--glass-effect-bg) size-full"></div>
        </div>
        <svg>
          <defs>
            <filter id="fractal-noise-glass">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.12 0.12"
                numOctaves="1"
                result="warp"></feTurbulence>
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp" />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
}
