"use client";
import Link from "next/link";


export default function Page() {

    return (
        <div className="flex h-full flex-1 flex-col justify-center align-center px-6 py-12 lg:px-8">
            <button className="btn glass btn-outline btn-primary w-64 place-self-center m-5"><Link href={`/login`}>Sign in</Link></button>
        </div>
        )
}