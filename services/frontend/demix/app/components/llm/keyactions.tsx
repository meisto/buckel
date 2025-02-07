// author: meisto
// date: 2025-02-07 23:21:21
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useFocusTrap, useHotkeys } from "@mantine/hooks";
import React from "react";

export type KeyActionDefinition = {
   hk: string;
   fn: (params: {}) => void;
   desc: string;
};

export function KeyActions({
   children,
   className,
}: {
   children?: React.ReactNode | React.ReactNode[] | undefined;
   className?: string | undefined;
}) {
   const hotkeys: KeyActionDefinition[] = [
      {
         hk: "ctrl+l",
         fn: () => null,
         desc: "Goto list",
      },
      {
         hk: "ctrl+s",
         fn: () => null,
         desc: "Goto prompt",
      },
   ];

   useHotkeys(hotkeys.map((x) => [x.hk, () => x.fn(() => null)]));
   const focusTrapRef = useFocusTrap();
   return (
      <div className="w-screen h-screen p-0 md:p-4" ref={focusTrapRef}>
         <div
            className={cn(
               "rounded-md w-full h-full overflow-hidden",
               "md:grid md:grid-rows-[auto_4ch]",
               className,
            )}
         >
            <div className="h-full overflow-hidden">{children}</div>
            <div className="hidden md:flex bg-cyan-100/10 h-full gap-4 justify-center items-center">
               {hotkeys.map((x, index) => {
                  const [modifier, key] = x.hk.split("+");
                  return (
                     <div key={index} className="flex gap-1">
                        <Badge variant="secondary">
                           <kbd>{modifier}</kbd>
                           <span>+</span>
                           <kbd>{key}</kbd>
                        </Badge>
                        <span className="text-sm">{x.desc}</span>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
