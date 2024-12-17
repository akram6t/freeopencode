import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";

const turso = createClient({
  url: 'libsql://freeopencode-akram6t.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzQyNTg5NzAsImlkIjoiN2MzMzM2Y2UtZjM1ZC00ZjZjLWFmYmMtMjg4YjY5YjRhYmNhIn0.PQu7UhWif5s_MgxNTofjLxCbflUx45abbBLzTJngIAlQpZ4j3c2OpjON6xahtC808Mmym4r3K2fYA2dvpF1fAQ',
});

export const db = drizzle(turso);