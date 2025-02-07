// author: meisto
// date: 2024-10-13 23:04:40
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { cn } from "@/lib/utils";

export function KeyPressComponent() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    let open = false;

    function handleKeyPress(event: KeyboardEvent) {
      if (event.key == "/") {
        setOpen(true);
        open = true;
        event.preventDefault();
        return;
      }

      if (open && event.key == "Escape") {
        open = false;
        return;
      }

      if (!open && event.ctrlKey) {
        console.log(`Key event intercepted: '${event.key}'`);
        if (event.key == "Escape") {
          event.preventDefault();
          router.push("/");
          return null;
        }
        if (event.key == "s") {
          event.preventDefault();
          router.push("/rag/overview");
          return null;
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    console.log("KeyEvent Listener added.");

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      console.log("KeyEvent Listener removed.");
    };
  }, [router]);

  const position = "top-[40%]";

  const menuContent = [
    {
      groupHeader: "Früchte",
      items: [
        { item: "Äpfel", onSelect: () => {} },
        { item: "Birnen", onSelect: () => {} },
      ],
    },
    {
      groupHeader: "Gemüse",
      items: [
        { item: "Kürbisse", onSelect: () => {} },
        { item: "Gurken", onSelect: () => {} },
        { item: "Kartoffeln", onSelect: () => {} },
      ],
    },
  ];

  return (
    <div className="hidden">
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className={cn(
          "flex flex-col items-center px-2 py-2 text-sm fixed",
          "left-1/2 transform -translate-x-1/2",
          "bg-[#39393C] rounded border border-cyan-50/20",
          position,
        )}
      >
        <Command.Input className="w-full focus:outline-none bg-transparent" />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          {menuContent.map((group, index) => (
            <Command.Group
              heading={group.groupHeader}
              key={`${group.groupHeader}_1_${index}`}
            >
              {group.items.map((item, index) => (
                <Command.Item
                  key={`${group.groupHeader}_2_${index}`}
                  onSelect={item.onSelect}
                >
                  {item.item}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </div>
  );
}
