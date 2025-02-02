// author: meisto
// date: 2025-02-02 16:34:25

import { config } from "src/config.ts";
import { warn } from "src/logger.ts";
import { Tool } from "src/types.ts";
import { renderTemplate } from "src/template.ts";

const systemPromptRouting = await Deno.readTextFile(
  "src/llm/system_prompt_routing.txt",
);
const systemPromptParsing = await Deno.readTextFile(
  "src/llm/system_prompt_parsing.txt",
);

export async function routeMessage(
  message: string,
  tools: Tool[],
): Promise<string | null> {
  const payload = renderTemplate({
    toolDefinitions: JSON.stringify(tools, null, 2),
    request: message,
    language: "EN",
  }, "routing");

  const response = await fetch(config.OLLAMA_URL + "/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": "llama3.1",
      "system": systemPromptRouting,
      "prompt": payload,
      "stream": false,
      "format": {
        "type": "object",
        "properties": {
          "targetToolName": {
            "type": ["string", "null"],
          },
        },
        "required": [
          "targetToolName",
        ],
      },
    }),
  });

  if (!response.ok) {
    warn(response.status.toString());
    warn(response.statusText);
    return null;
  }

  const responseData = await response.json();

  if (!responseData.response) {
    warn("Received unexpected response from ollama.");
    return null;
  }

  return JSON.parse(responseData.response).targetToolName ?? null;
}

/*
 * Given a message string and a tool, ask the model to extract the tool
 * parameters from the message.
 */
export async function parseMessage(
  message: string,
  tool: Tool,
): Promise<object | null> {
  const payload = renderTemplate({
    toolDefinitions: JSON.stringify(tool, null, 2),
    request: message,
    language: "EN",
  }, "parsing");

  const response = await fetch(config.OLLAMA_URL + "/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": "llama3.1",
      "system": systemPromptParsing,
      "prompt": payload,
      "stream": false,
      "format": {
        "type": "object",
        "properties": tool.properties,
        "required": tool.required,
      },
    }),
  });

  if (!response.ok) {
    warn("Illegal response while parsing message.");
    warn(response.status.toString());
    warn(response.statusText);
    return null;
  }

  const data = await response.json();

  return JSON.parse(data.response) ?? null;
}
