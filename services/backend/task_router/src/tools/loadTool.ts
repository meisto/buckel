// author: meisto
// date: 2025-02-02 13:05:55

import { parse } from "@std/yaml";
import { ToolFile } from "src/types.ts";
import * as v from "@valibot/valibot";

import { warn } from "src/logger.ts";
import { ToolFileSchema } from "src/schemes/tools.ts";

export async function loadToolsFromFile(
  fileName: string,
): Promise<ToolFile | null> {
  try {
    await Deno.lstat(fileName);
  } catch (_) {
    warn(`Could not open file '${fileName}'.`);
    return null;
  }

  const text = await Deno.readTextFile(fileName);
  const content = parse(text);

  const data = v.parse(ToolFileSchema, content);
  return data;
}
