// author: meisto
// date: 2025-01-31 22:56:26
import { sql } from "src/db/pg.ts";
import { loadToolsFromFile } from "src/tools/loadTool.ts";
import { ToolFile } from "src/types.ts";
import { info, warn } from "src/logger.ts";
import { parseMessage, routeMessage } from "src/llm/ollama.ts";

async function main() {
  await start();
  await run();
  await stop();
}

async function start() {
}

async function run() {
  const toolFile = "tools.yaml";

  const tools: ToolFile | null = await loadToolsFromFile(toolFile);
  if (tools == null) {
    warn(`Could not load tools from file ${toolFile}`);
    return;
  }

  info(`Successfully parsed file '${toolFile}'`);

  const query = "I am so hungry. I could go for italian.";
  const routed = await routeMessage(query, tools);

  info(routed ?? "null");
  if (!routed) return;

  const tool = tools.find((x) => x.name == routed);
  if (!tool) {
    warn(`Tool routing returned a tool that does not exist '${routed}'`);
    return;
  }

  const parsed = await parseMessage(query, tool);
  if (!parsed) {
    warn("Query could not be parsed.");
    return;
  }
  info(JSON.stringify(parsed));
}

async function stop() {
  // Stop database connection.
  await sql.end();
}

main();
