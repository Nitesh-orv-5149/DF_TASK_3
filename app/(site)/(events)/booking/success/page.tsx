import { Check } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
    return (
        <>
        <main className="h-screen flex flex-col items-center gap-4 justify-center bg-gradient-to-b from-dark-2/70">
            <div className="flex items-center justify-center md:gap-10 gap-6 text-4xl">
                <div className="flex flex-col items-center justify-center size-4xl text-light-2 rounded-full shadow-lg">
                    <Check className="w-20 h-20 animate-bounce" />
                </div>
                <h2 className="font-bold text-light-1">Booking success</h2>
            </div>
            <h4>The ticket will be sent to your registered email</h4>
            <Link href={'/'} className="underline underline-offset-6 text-light-2">go to home page</Link>
        </main>
        </>
    )
}