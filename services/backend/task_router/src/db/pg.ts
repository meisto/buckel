// author: meisto
// date: 2025-01-31 23:42:33
import postgres from "npm:postgres";
import { config } from "src/config.ts";

export const sql = postgres({
  database: config.PG_DB_NAME,
  user: config.PG_DB_USER,
  password: config.PG_DB_PASSWORD,
  hostname: config.PG_HOSTNAME,
  port: config.PG_PORT,
  debug: false,
  transform: postgres.camel,
});
