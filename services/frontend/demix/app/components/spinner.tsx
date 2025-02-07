// author: meisto
// date: 2024-11-13 23:36:23

import { cn } from "@/lib/utils";

export function RotatingSpinner({
  enabled,
  className,
}: {
  enabled: boolean;
  className?: string;
}) {
  return enabled ? (
    <div
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-b-transparent align-[-0.125em] text-surface",
        "motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white",
        className,
      )}
      role="status"
    />
  ) : null;
}
