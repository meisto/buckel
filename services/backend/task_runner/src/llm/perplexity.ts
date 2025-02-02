// author: meisto
// date: 2025-02-02 16:34:25

import { config } from "src/config.ts";
import { warn } from "src/logger.ts";

export async function route(payload: string): Promise<string | null> {
  const response = await fetch(config.OLLAMA_URL + "/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": "llama3.1",
      "prompt": "",
      "stream": false,
      "format": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
          },
        },
        "required": [
          "name",
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

  return JSON.stringify(responseData.response) ?? "null";
}
