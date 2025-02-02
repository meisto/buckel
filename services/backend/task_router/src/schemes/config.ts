// author: meisto
// date: 2025-02-02 10:45:44
import * as v from "@valibot/valibot";

export const ConfigSchema = v.object({
  PG_DB_NAME: v.string("Missing PG_DB_NAME"),
  PG_DB_USER: v.string("Missing PG_DB_USER"),
  PG_DB_PASSWORD: v.string("Missing PG_DB_PASSWORD"),
  PG_HOSTNAME: v.string("Missing PG_HOSTNAME"),
  PG_PORT: v.pipe(
    v.string("Missing PG_PORT"),
    v.transform((input: string) => parseInt(input)),
    v.integer(),
  ),
  OLLAMA_URL: v.string("No ollama url given."),
});
