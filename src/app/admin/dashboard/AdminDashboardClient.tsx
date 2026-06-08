'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    Film,
    Plus,
    Pencil,
    Trash2,
    LogOut,
    X,
    Check,
    AlertTriangle,
} from 'lucide-react';
import type { Film as FilmType } from '@/types';

const EMPTY_FORM = {
    title: '',
    description: '',
    category: '',
    language: '',
    year: new Date().getFullYear().toString(),
    quality: '1080p',
    posterUrl: '',
    driveLink: '',
};

interface Props {
    initialFilms: FilmType[];
}

export default function AdminDashboardClient({ initialFilms }: Props) {
    const router = useRouter();
    const [films, setFilms] = useState<FilmType[]>(initialFilms);
    const [showForm, setShowForm] = useState(false);
    const [editingFilm, setEditingFilm] = useState<FilmType | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const handleLogout = async () => {
        await fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin');
    };

    const openAdd = () => {
        setEditingFilm(null);
        setForm(EMPTY_FORM);
        setError('');
        setShowForm(true);
    };

    const openEdit = (film: FilmType) => {
        setEditingFilm(film);
        setForm({
            title: film.title,
            description: film.description,
            category: film.category,
            language: film.language,
            year: film.year.toString(),
            quality: film.quality,
            posterUrl: film.posterUrl,
            driveLink: film.driveLink,
        });
        setError('');
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = editingFilm
            ? `/api/admin/films/${editingFilm.id}`
            : '/api/admin/films';
        const method = editingFilm ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            const updated = await res.json();
            if (editingFilm) {
                setFilms(films.map((f) => (f.id === updated.id ? updated : f)));
            } else {
                setFilms([updated, ...films]);
            }
            setShowForm(false);
        } else {
            const data = await res.json();
            setError(data.error || 'Something went wrong');
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        const res = await fetch(`/api/admin/films/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setFilms(films.filter((f) => f.id !== id));
            setDeleteConfirm(null);
        }
    };

    const QUALITIES = ['CAM', '480p', '720p', '1080p', '4K'];
    const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Spanish', 'French', 'Korean', 'Japanese', 'Other'];
    const CATEGORIES = ['Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Romance', 'Sci-Fi', 'Animation', 'Documentary', 'Fantasy', 'Crime', 'Other'];

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Admin Header */}
            <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <Film className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-white text-sm">FilmHub</span>
                            <span className="text-red-500 font-bold text-sm"> Admin</span>
                        </div>
                        <span className="hidden sm:block ml-2 badge bg-green-600/20 text-green-400 border border-green-600/30 text-xs">
                            ● Online
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn-secondary text-sm py-2 px-4"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Films', value: films.length, color: 'text-blue-400' },
                        { label: 'Categories', value: Array.from(new Set(films.map((f) => f.category))).length, color: 'text-green-400' },
                        { label: 'Languages', value: Array.from(new Set(films.map((f) => f.language))).length, color: 'text-purple-400' },
                    ].map(({ label, value, color }) => (
                        <div key={label} className="card p-5 border border-gray-800">
                            <p className="text-gray-400 text-sm">{label}</p>
                            <p className={`text-3xl font-extrabold mt-1 ${color}`}>{value}</p>
                        </div>
                    ))}
                </div>

                {/* Films Table Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">All Films</h2>
                    <button onClick={openAdd} className="btn-primary text-sm py-2">
                        <Plus className="w-4 h-4" />
                        Add Film
                    </button>
                </div>

                {/* Films List */}
                <div className="space-y-3">
                    {films.length === 0 && (
                        <div className="card p-12 text-center">
                            <Film className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                            <p className="text-gray-500">No films yet. Add your first film!</p>
                        </div>
                    )}
                    {films.map((film) => (
                        <div
                            key={film.id}
                            className="card flex items-center gap-4 p-4 border border-gray-800"
                        >
                            {/* Poster Thumbnail */}
                            <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                                <Image
                                    src={film.posterUrl}
                                    alt={film.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white truncate">{film.title}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="badge bg-gray-700 text-gray-300 text-xs">{film.category}</span>
                                    <span className="badge bg-gray-700 text-gray-300 text-xs">{film.year}</span>
                                    <span className="badge bg-blue-900/50 text-blue-300 text-xs">{film.quality}</span>
                                    <span className="badge bg-gray-700 text-gray-300 text-xs">{film.language}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => openEdit(film)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                                    title="Edit"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                {deleteConfirm === film.id ? (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleDelete(film.id)}
                                            className="p-2 rounded-lg text-red-400 hover:text-white hover:bg-red-700 transition-colors"
                                            title="Confirm delete"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(null)}
                                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setDeleteConfirm(film.id)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/30 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Add/Edit Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
                    <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                            <h3 className="text-lg font-bold text-white">
                                {editingFilm ? 'Edit Film' : 'Add New Film'}
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Film Title *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="input-field"
                                        placeholder="e.g. Inception"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Category *</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="input-field"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Language *</label>
                                    <select
                                        value={form.language}
                                        onChange={(e) => setForm({ ...form, language: e.target.value })}
                                        className="input-field"
                                        required
                                    >
                                        <option value="">Select language</option>
                                        {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Year *</label>
                                    <input
                                        type="number"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                                        className="input-field"
                                        min="1900"
                                        max={new Date().getFullYear() + 2}
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Quality *</label>
                                    <select
                                        value={form.quality}
                                        onChange={(e) => setForm({ ...form, quality: e.target.value })}
                                        className="input-field"
                                        required
                                    >
                                        {QUALITIES.map((q) => <option key={q} value={q}>{q}</option>)}
                                    </select>
                                </div>

                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Poster Image URL *</label>
                                    <input
                                        type="url"
                                        value={form.posterUrl}
                                        onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
                                        className="input-field"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Google Drive Download Link *</label>
                                    <input
                                        type="url"
                                        value={form.driveLink}
                                        onChange={(e) => setForm({ ...form, driveLink: e.target.value })}
                                        className="input-field"
                                        placeholder="https://drive.google.com/..."
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2 space-y-1">
                                    <label className="text-sm font-medium text-gray-300">Description *</label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="input-field min-h-[120px] resize-y"
                                        placeholder="Write a brief description of the film..."
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded-lg px-4 py-3">
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary flex-1 justify-center disabled:opacity-60"
                                >
                                    {loading ? 'Saving...' : editingFilm ? 'Update Film' : 'Add Film'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="btn-secondary px-6"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
