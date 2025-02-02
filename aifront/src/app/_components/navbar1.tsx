"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <nav className="bg-black shadow-md fixed w-full z-10 top-0 opacity-70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
            <div className="flex text-xl font-bold text-gray-100">
                Self-reflection
            </div>
            <div className="flex-shrink-0">
                <Link href="/">
                <Button className="text-white bg-gray-400 hover:bg-gray-200 text-xl text-gray-700 hover:text-gray-900">
                    Home
                </Button>
                </Link>
            </div>
            </div>
        </div>
        </nav>
    );
}