'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Film, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800/60">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors">
                            <Film className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight">
                            <span className="text-white">Film</span>
                            <span className="text-red-500">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
                        >
                            Home
                        </Link>
                        <Link
                            href="/films"
                            className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
                        >
                            All Films
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {menuOpen && (
                    <div className="md:hidden py-3 pb-4 border-t border-gray-800/60 space-y-1">
                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/films"
                            onClick={() => setMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                            All Films
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
