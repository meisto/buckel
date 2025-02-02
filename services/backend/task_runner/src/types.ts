// author: meisto
// date: 2025-02-02 12:45:45

import * as v from "@valibot/valibot";
import { SessionSchema } from "src/schemes/db.ts";
import { ToolFileSchema, ToolSchema } from "src/schemes/tools.ts";

export type Session = v.InferOutput<typeof SessionSchema>;
export type Tool = v.InferOutput<typeof ToolSchema>;
export type ToolFile = v.InferOutput<typeof ToolFileSchema>;

export type TCTemplateData = {
  toolDefinitions: string;
  request: string;
  language: "DE" | "EN";
};
