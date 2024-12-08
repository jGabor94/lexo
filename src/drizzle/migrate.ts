import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./db";


const main = async () => {
    try {
        console.log("Migration started");
        await migrate(db, { migrationsFolder: "src/drizzle/migrations" });
        console.log("Migration completed");
        process.exit(0);
    } catch (err) {
        console.error("Error during migration:", err);
        process.exit(1);
    }
}

main()