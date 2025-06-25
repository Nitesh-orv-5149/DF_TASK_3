"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {

    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <Link href="/profile">
                    <button className="shadow-2xl bg-gradient-to-r from-light-1 to-light-2 font-extrabold hover:scale-115 transition-all duration-300 px-4 py-2 rounded-full">profile</button>
                </Link>
            </>
        )
    }

    return (
        <>
            <Link href="/auth">
                <button className="shadow-2xl bg-gradient-to-r from-light-1 to-light-2 font-extrabold hover:scale-115 transition-all duration-300 px-4 py-2 rounded-full">get started</button>
            </Link>
        </>
    )
    
}