import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import * as authSchema from "./auth-schema.ts";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "../prisma/generated/prisma/client.ts"

const { Pool } = pg;

// export const db = drizzle({
//   client: new Pool({
//     connectionString: process.env.DB_URL,
//   }),
//   schema: {
//     ...schema,
//     ...authSchema
//   },
// });

const connectionString = Bun.env.DB_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({adapter})

export {prisma}
