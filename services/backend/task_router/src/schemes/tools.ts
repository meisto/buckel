// author: meisto
// date: 2025-02-02 12:52:48

import * as v from "@valibot/valibot";

enum DataType {
  string = "string",
  object = "object",
  array = "array",
  number = "number",
  boolean = "boolean",
  null = "null",
}

const ToolParameterSchema = v.object({
  type: v.enum(DataType, "Illegal tool parameter data type."),
  description: v.pipe(
    v.string("Could not read tool parameter description."),
    v.minLength(1),
  ),
});

export const ToolSchema = v.object({
  name: v.pipe(
    v.string("Could not read tool name."),
    v.minLength(5, "Tool Name must have at lest 5 characters."),
  ),
  description: v.pipe(
    v.string("Could not read tool description."),
    v.minLength(10),
  ),
  properties: v.record(v.string(), ToolParameterSchema),
  required: v.array(v.string(), "Could not find required array."),
});

export const ToolFileSchema = v.array(ToolSchema);
