// author: meisto
// date: 2024-11-10 18:25:43

import type {
   LLMMessage as db_LLMMessage,
   LLMChat as db_LLMChat,
} from "@prisma/client";

export type LLMRole = "user" | "assistant" | "system";
export type LLMMessage = db_LLMMessage;
export type LLMChat = db_LLMChat;
