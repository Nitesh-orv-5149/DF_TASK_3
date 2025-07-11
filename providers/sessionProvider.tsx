"use client"

import { SessionProvider as NextAuthProvider } from "next-auth/react"

export default function SssionProvider({ children, session }: { children: React.ReactNode, session: any }) {
    return (
        <NextAuthProvider session={session}>
            {children}
        </NextAuthProvider>
    )
}
