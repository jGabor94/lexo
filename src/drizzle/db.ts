import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
)

const client = postgres(DATABASE_URL)
export const db = drizzle({ client, schema });



