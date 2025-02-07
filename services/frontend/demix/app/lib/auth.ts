// author: meisto
// date: 2025-02-07 23:26:10

export type Session = {user: string};
export async function getCurrentSession(): Promise<Session> {
   return {user: "default"}
}
