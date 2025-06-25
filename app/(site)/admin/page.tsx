import Link from "next/link"

export default function adminPage() {
    return (
        <>
           <main className="p-4 min-h-screen bg-gradient-to-b from-light-1/50 to-20% ">
                <header className="flex flex-col items-center justify-start mb-8">
                    <h1 className="uppercase font-extrabold text-3xl ">admin control centre</h1>
                    <p className="text-lg mt-4">This is the admin control centre for managing the site.</p>
                    <Link className="underline" href={'/admin/profile'}>profile</Link>
                </header>
                <section className="mt-8 flex flex-col items-start justify-start gap-4">
                    <Link href={"/admin/manage-events"}>
                        <button className="px-6 py-3 bg-light-2 text-dark-1 font-bold rounded-full hover:bg-light-1 transition-colors">
                            Manage Events
                        </button>
                    </Link>

                </section>
           </main>
        </>
    )
}