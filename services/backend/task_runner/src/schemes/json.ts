// author: meisto
// date: 2025-02-02 22:23:15

import * as v from "@valibot/valibot";

enum Types {
  string = "string",
  object = "object",
  array = "array",
  number = "number",
  boolean = "boolean",
  null = "null",
}

export const JSONSchemaSchema = v.object({
  title: v.string(),
  description: v.string(),
  type: v.enum(Types),
});
