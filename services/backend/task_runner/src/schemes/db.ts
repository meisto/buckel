// author: meisto
// date: 2025-02-02 12:41:45

import * as v from "@valibot/valibot";

export const SessionSchema = v.object({
  sessionId: v.pipe(v.string(), v.minLength(1)),
  accessCode: v.string(),
  lastAccess: v.number(),
});
