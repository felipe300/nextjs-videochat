"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!loading ? (
        <header className="animate-pulse shadow">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between p-3 font-medium">
            <div className="h-10 w-20 rounded bg-gray-200"></div>
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </header>
      ) : (
        <header className="shadow">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between p-3 font-medium">
            <Link href="/">New meeting</Link>
            <SignedIn>
              <div className="flex items-center gap-5">
                <Link href="/meetings">Meetings</Link>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </header>
      )}
    </>
  );
}
