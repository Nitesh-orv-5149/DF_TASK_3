import { User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <>
            {/* Header */}
            <header className="flex justify-between items-center mb-20">
                <div className="flex items-center gap-4">
                    <Image src={'/logo.png'} alt="logo" width={70} height={70}></Image>
                    <h1 className="text-4xl font-extrabold tracking-wide">
                        Book<span className="text-light-1">It</span>
                    </h1>
                </div>
                <Link href={'/profile'}>
                    <button className="">
                        <User size={40} className="text-gray-400 hover:text-light-1" />
                    </button>
                </Link>
            </header>

            {/* Hero */}
            <section className="mb-24">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Book your 
                    <span className="text-light-1"> experience</span>
                </h2>
                <p className="text-lg text-gray-400 font-light ">
                    Simple booking for movies, trains, and concerts. Clean, fast, reliable.
                </p>
            </section>
        </>
    )
}