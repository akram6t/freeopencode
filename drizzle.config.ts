// import dotenv from 'dotenv';
// dotenv.config('./.env.local');
import type { Config } from "drizzle-kit";

export default {
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'turso',
    dbCredentials: {
        url: 'libsql://freeopencode-akram6t.turso.io',
        authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzQyNTg5NzAsImlkIjoiN2MzMzM2Y2UtZjM1ZC00ZjZjLWFmYmMtMjg4YjY5YjRhYmNhIn0.PQu7UhWif5s_MgxNTofjLxCbflUx45abbBLzTJngIAlQpZ4j3c2OpjON6xahtC808Mmym4r3K2fYA2dvpF1fAQ'
    //   url: process.env.TURSO_DATABASE_URL!,
    //   authToken: process.env.TURSO_AUTH_TOKEN!
    },
} satisfies Config;