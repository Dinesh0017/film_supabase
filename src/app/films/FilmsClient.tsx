"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function FilmsClient({ films }: { films: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(films.map((film) => film.category).filter(Boolean))
      ).sort(),
    ];
  }, [films]);

  const filteredFilms = useMemo(() => {
    if (selectedCategory === "All") return films;

    return films.filter((film) => film.category === selectedCategory);
  }, [films, selectedCategory]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm uppercase tracking-[0.35em] text-red-500">
          FilmHub Library
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl font-black md:text-4xl">All Movies</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Browse all movies with category, language, quality, and download
              details.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900 px-6 py-4">
            <p className="text-sm text-zinc-400">Showing Movies</p>
            <p className="text-3xl font-bold">{filteredFilms.length}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "border border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={film.posterUrl || film.poster_url || "/placeholder.jpg"}
                  alt={film.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold">
                  {film.quality || "HD"}
                </div>
              </div>

              <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-bold">
                  {film.title}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {film.category} • {film.language} • {film.year}
                </p>

                <Link
                  href={`/film/${film.id}`}
                  className="mt-5 block rounded-xl bg-red-600 py-3 text-center font-bold hover:bg-red-700"
                >
                  Download
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredFilms.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center">
            <p className="text-zinc-400">No films found in this category.</p>
          </div>
        )}
      </section>
    </main>
  );
}