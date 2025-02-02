// author: meisto
// date: 2025-02-02 16:04:14

import { Eta } from "@eta-dev/eta";

import type { TCTemplateData } from "src/types.ts";

const eta = new Eta({ views: "templates" });

export function renderTemplate(
  data: TCTemplateData,
  mode: "routing" | "parsing",
): string {
  if (data.language === "DE") {
    throw new Error("Not implemented.");
  }

  if (mode == "routing") return eta.render("routing_default_en.eta", data);
  return eta.render("parsing_default_en.eta", data);
}
