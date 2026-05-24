import { cn } from "@/lib/utils"
import { SpinnerBallIcon } from "@phosphor-icons/react";

function Spinner({
  className,
  ...props
}) {
  return (
    <SpinnerBallIcon
      role="status"
      aria-label="Loading"
      className={cn("size-32 animate-spin", className)}
      {...props} />
  );
}

export { Spinner }
