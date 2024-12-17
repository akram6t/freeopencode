import { ThemeSwitch } from "@/components/theme-switch";
import { db } from "@/db/drizzle";

export default async function HomePage(){

    const addData = async () => {
        'use server';
        
    }
    
    return(
        <main>
            <ThemeSwitch/>
            <button onClick={addData}>add simple</button>
        </main>
    )
}