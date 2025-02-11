// author: meisto
// date: 2025-02-06 22:44:51

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function formatDate(
   date: Date,
   showDom: boolean = false,
   showTime: boolean = false,
) {
   const dayOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

   const day = date.getDate().toString().padStart(2, "0");
   const month = (date.getMonth() + 1).toString().padStart(2, "0");
   const year = date.getFullYear().toString();

   const hours = date.getHours().toString().padStart(2, "0");
   const minutes = date.getMinutes().toString().padStart(2, "0");

   let formated_string = `${day}.${month}.${year}`;

   if (showDom)
      formated_string = `${dayOfWeek[date.getDay()]},  ${formated_string}`;
   if (showTime) formated_string = `${hours}:${minutes} - ${formated_string}`;

   return formated_string;
}

export function tryOr<T>(tryFn: () => T, defaultValue: T): T {
   try {
      return tryFn();
   } catch {
      return defaultValue;
   }
}

export function parseIntOrDefault(s: string | null, defaultValue: number) {
   if (!s) return defaultValue;

   const parsed = parseInt(s);
   return isNaN(parsed) ? defaultValue : parsed;
}
