'use client';

import { useState, useMemo } from 'react';
import { Film } from '@/types';
import FilmCard from '@/components/FilmCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { Clapperboard } from 'lucide-react';

interface HomeClientProps {
    films: Film[];
    categories: string[];
}

export default function HomeClient({ films, categories }: HomeClientProps) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filtered = useMemo(() => {
        return films.filter((f) => {
            const matchSearch =
                !search ||
                f.title.toLowerCase().includes(search.toLowerCase()) ||
                f.description.toLowerCase().includes(search.toLowerCase());
            const matchCat = !selectedCategory || f.category === selectedCategory;
            return matchSearch && matchCat;
        });
    }, [films, search, selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Hero */}
            <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-950/40 via-gray-900/60 to-gray-950 border border-gray-800/60 px-6 py-12 sm:py-16 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 text-red-400 text-sm font-medium mb-2">
                        <Clapperboard className="w-4 h-4" />
                        HD Movies & Series
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        <span className="text-white">Your Ultimate</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                            Movie Hub
                        </span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
                        Discover and download the latest movies in HD quality. Browse by
                        category, language, and year.
                    </p>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            placeholder="Search by title..."
                        />
                    </div>
                </div>
                <CategoryFilter
                    categories={categories}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                />
            </section>

            {/* Results count */}
            <div className="flex items-center justify-between">
                <h2 className="section-title">
                    {selectedCategory || 'All Films'}
                </h2>
                <span className="text-gray-500 text-sm">
                    {filtered.length} film{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Film Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filtered.map((film) => (
                        <FilmCard key={film.id} film={film} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                        <Clapperboard className="w-10 h-10 text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-lg font-medium">No films found</p>
                    <p className="text-gray-600 text-sm">
                        {search
                            ? `No results for "${search}"`
                            : 'No films in this category yet.'}
                    </p>
                </div>
            )}
        </div>
    );
}
