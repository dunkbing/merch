/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "@/fresh.config.ts";
import { triggerJobs } from "@/utils/cron_jobs.ts";
import { importCategories } from "@/utils/db/category.ts";

await importCategories();
await triggerJobs();

await start(manifest, config);
