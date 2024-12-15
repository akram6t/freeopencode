import { db } from "@/db/drizzle"
import { usersTable } from "@/db/schema"

export default async function Page(){
  // console.log("server side run");
  const query = await db.select().from(usersTable).all();
  console.log(query);
   

  return(
    <main className="min-h-screen bg-neutral-900 text-white">
      page
    </main>
  )
}