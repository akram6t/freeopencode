import { auth, signOut } from "@/auth";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
    const session = await auth();

    const handleSignOut = async () => {
        'use server'
        await signOut({
            redirectTo: "/login"
        })
    };

    return (
        <main>
            <ThemeSwitch />
            {
                session?.user ? (
                    <div className="bg-white dark:bg-neutral-800 shadow-lg">
                        <img className="w-16 h-16" src={session.user.image?.toString()}></img>
                        <p>{session.user.id}</p>
                        <p>{session.user.name}</p>
                        <p>{session.user.email}</p>
                        <button onClick={handleSignOut}>Signout</button>
                    </div>
                ) :
                    (
                        <Button asChild variant={'link'}>
                            <Link href={'/login'}>
                                Please Login
                            </Link>
                        </Button>
                    )
            }
        </main>
    )
}