import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
)
const sql = neon(DATABASE_URL)
export const db = drizzle({ client: sql })


