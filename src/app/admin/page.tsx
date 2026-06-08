'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Film, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin/dashboard');
        } else {
            setError('Invalid admin password. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex w-16 h-16 bg-red-600 rounded-2xl items-center justify-center mb-4 shadow-2xl shadow-red-600/40">
                        <Film className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white">
                        FilmHub Admin
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Enter your admin password to continue
                    </p>
                </div>

                <div className="card p-8 space-y-6">
                    <div className="flex items-center gap-3 bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-3">
                        <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                        <p className="text-amber-300 text-xs">
                            This area is restricted. Unauthorized access is prohibited.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Admin Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="input-field pr-12"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded-lg px-4 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Authenticating...' : 'Access Admin Panel'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
