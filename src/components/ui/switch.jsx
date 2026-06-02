import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  children,
  ...props
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[checked]:bg-foreground data-[unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}>
      {children ?? <SwitchThumb />}
    </SwitchPrimitive.Root>
  );
}

function SwitchThumb({
  className, children,
  ...props
}) {
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      className={cn(
        "bg-border dark:data-[unchecked]:bg-foreground dark:data-[checked]:bg-primary-foreground cursor-pointer block size-4 rounded-full ring-0 transition-transform data-[checked]:translate-x-[calc(100%-2px)] data-[unchecked]:translate-x-0",
        className
      )}
      {...props}>
      {children}
    </SwitchPrimitive.Thumb>
  );
}

export { Switch, SwitchThumb };
