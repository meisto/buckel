// author: meisto
// date: 2024-10-20 18:10:07
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StyledLink({
  className,
  href,
  children,
}: {
  className?: string;
  href: string;
  children?: React.ReactNode;
}) {
  const focusedStyle: string = "focus:outline-none focus:bg-purple/50";

  return (
    <Link
      href={href}
      className={cn(
        "h-fit p-2 bg-purple border border-purple-900 rounded-lg font-bold text-md",
        focusedStyle,
        className,
      )}
    >
      {children}
    </Link>
  );
}
