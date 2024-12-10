import { config } from "dotenv";
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

config({ path: ".env.local" })

export default defineConfig({
    out: './src/drizzle/migrations',
    schema: './src/drizzle/schema.ts',
    dialect: 'postgresql',
    strict: true,
    verbose: true,
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});