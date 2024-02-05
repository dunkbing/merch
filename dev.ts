#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "@/fresh.config.ts";
import "$std/dotenv/load.ts";
import { importCategories } from "@/utils/db/category.ts";
import { triggerJobs } from "@/utils/cron_jobs.ts";

await importCategories();
await triggerJobs();

await dev(import.meta.url, "./main.ts", config);
