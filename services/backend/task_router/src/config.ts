// author: meisto
// date: 2025-02-02 10:53:24

import { ConfigSchema } from "src/schemes/config.ts";
import * as v from "@valibot/valibot";

export const config = v.parse(ConfigSchema, Deno.env.toObject());
