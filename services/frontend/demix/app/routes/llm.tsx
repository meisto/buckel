// author: meisto
// date: 2025-02-07 23:16:22

import { ChatInput } from "@/components/chats/input";
import { cn } from "@/lib/utils";

import { redirect } from "react-router";
import { KeyActions } from "~/components/llm/keyactions";
import { getCurrentSession } from "~/lib/auth";


export default async function Page() {
   const { user } = (await getCurrentSession()) || { user: null };
   if (user === null) return redirect("/auth/login");

   return (
      <KeyActions>
         <form
            action="/api/v1/llm/sessions"
            method="POST"
            className="flex justify-center flex-col h-full"
         >
            <ChatInput
               className={cn("w-11/12 md:w-2/3 h-36 m-auto")}
               placeHolder="Eingabe starten..."
            />
         </form>
      </KeyActions>
   );
}
