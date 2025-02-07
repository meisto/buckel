// author: meisto
// date: 2024-11-09 00:06:39

import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { CircleArrowRight } from "lucide-react";
import { Card } from "../ui/card";

export function ChatInput({
  className,
  placeHolder,
  disabled,
}: {
  className?: string | undefined;
  placeHolder?: string | undefined;
  disabled?: boolean;
}) {
  return (<Card className="bg-card p-1 relative">
    <div className={cn("relative text-white/90", className)}>
      <Textarea
        className={cn(
          "rounded-lg bg-zinc-50/5 border border-zinc-50/10 resize-none h-full",
          "transition-colors duration-200 p-6",
        )}
        placeholder={placeHolder}
        name="query"
        disabled={disabled}
      />
      <div className="flex justify-end absolute right-2 bottom-2 gap-2">
        <button
          type="submit"
          className="group outline-none"
          disabled={disabled}
        >
          <CircleArrowRight
            size={32}
            className="group-focus:text-purple opacity-60 transition-colors duration-200"
          />
        </button>
      </div>
    </div>
    </Card>
  );
}
