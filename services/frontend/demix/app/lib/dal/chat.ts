// author: meisto
// date: 2024-11-10 18:05:46
import { prisma } from "@/lib/prisma";
import type { LLMChat, LLMRole, LLMMessage } from "./types";

export async function createChat(
   sessionName: string,
   userId: string,
): Promise<LLMChat | null> {
   return prisma.lLMChat.create({
      data: {
         name: sessionName,
         userId: userId,
      },
   });
}

export async function getChat(
   sessionId: string,
   userId: string,
): Promise<LLMChat | null> {
   return prisma.lLMChat.findFirst({
      where: { id: sessionId, userId: userId, deleted: false },
   });
}

export async function getChats(userId: string): Promise<LLMChat[]> {
   return prisma.lLMChat.findMany({
      where: { AND: { userId: userId, deleted: false } },
      orderBy: [{ dateCreated: "desc" }],
   });
}

/**
 * Return a paginated list of chats. This function clips the page number to the actual
 * number of pages.
 * */
export async function getPaginatedChats(
   userId: string,
   page: number = 0,
   elementsPerPage: number = 20,
): Promise<{ chats: LLMChat[]; page: number; lastPage: number }> {
   const count = await prisma.lLMChat.count();
   const lastPage = Math.floor(count / (elementsPerPage + 1));
   const actualPage: number = Math.max(0, Math.min(page, lastPage));

   return prisma.lLMChat
      .findMany({
         where: { AND: { userId: userId, deleted: false } },
         orderBy: [{ dateUpdated: "asc" }],
         skip: actualPage * elementsPerPage,
         take: elementsPerPage,
      })
      .then((x) => {
         return { chats: x, page: actualPage, lastPage: lastPage };
      });
}

export async function deleteChat(
   userId: string,
   sessionId: string,
): Promise<boolean> {
   try {
      await prisma.lLMChat.update({
         where: { userId, id: sessionId },
         data: { deleted: true },
      });
      return true;
   } catch {
      return false;
   }
}

export async function getChatMessage(
   chatId: string,
   index: number,
): Promise<LLMMessage | null> {
   return prisma.lLMMessage.findFirst({ where: { chatId, index } });
}

export async function getChatMessages(
   chatId: string,
   userId: string,
   limit?: number,
): Promise<LLMMessage[]> {
   console.log("add validation that session belongs to a user");
   console.log(userId);

   if (limit === undefined) {
      return prisma.lLMMessage.findMany({
         where: { chatId },
         orderBy: { index: "asc" },
      });
   }

   return prisma.lLMMessage.findMany({
      where: { chatId },
      orderBy: { index: "asc" },
      take: -limit,
   });
}

export async function addChatMessage(
   chatId: string,
   role: LLMRole,
   content: string,
): Promise<LLMMessage> {
   const maxIndex: number | null = (
      await prisma.lLMMessage.aggregate({
         where: { chatId },
         _max: {
            index: true,
         },
      })
   )._max.index;

   await prisma.lLMChat.update({
      data: {
         dateUpdated: new Date(),
      },
      where: {
         id: chatId,
      },
   });

   return prisma.lLMMessage.create({
      data: {
         chatId,
         content,
         index: maxIndex === null ? 0 : maxIndex + 1,
         role: role.toString(),
      },
   });
}

export async function setMessageContent(
   chatId: string,
   index: number,
   newContent: string,
) {
   await prisma.lLMMessage.update({
      data: { content: newContent },
      where: {
         chatId_index: {
            index,
            chatId,
         },
      },
   });
}
