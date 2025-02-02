// author: meisto
// date: 2025-02-02 20:37:44
import postgres from "npm:postgres";
import { config } from "src/config.ts";

const sql = postgres({
  database: config.PG_DB_NAME,
  user: config.PG_DB_USER,
  password: config.PG_DB_PASSWORD,
  hostname: config.PG_HOSTNAME,
  port: config.PG_PORT,
  debug: false,
  transform: postgres.camel,
});

async function run_script() {
  await sql`CREATE TABLE IF NOT EXISTS access (userId varchar(50), accessCode varchar(50), lastAccess INTEGER);`;

  sql.end();
}
run_script();
