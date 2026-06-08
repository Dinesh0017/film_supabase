"use client";

import { useState } from "react";
import Link from "next/link";

export default function EditFilmForm({ film }: any) {
  const [poster, setPoster] = useState(film.poster_url || "");

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-gradient-to-r from-red-600/20 to-zinc-900 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">
              FilmHub Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold">Edit Film</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Update movie details, poster, category and download link.
            </p>
          </div>

          <Link
            href="/admin/films"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 hover:bg-white/10"
          >
            ← Back
          </Link>
        </div>

        <form
          action={`/api/admin/films/${film.id}`}
          method="POST"
          className="grid gap-8 lg:grid-cols-[320px_1fr]"
        >
          {/* Poster Preview */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-5">
            <img
              src={poster || "/placeholder.jpg"}
              alt={film.title}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpg";
              }}
              className="h-[460px] w-full rounded-2xl object-cover"
            />

            <div className="mt-4 rounded-2xl bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Live Poster Preview</p>
              <h2 className="mt-1 text-xl font-bold">{film.title}</h2>
              <p className="mt-1 text-sm text-zinc-500">
                {film.category} • {film.language} • {film.quality}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Film Title
                </label>
                <input
                  name="title"
                  defaultValue={film.title}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Year
                </label>
                <input
                  name="year"
                  type="number"
                  defaultValue={film.year}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={film.category}
                  className={inputClass}
                >
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Horror">Horror</option>
                  <option value="Drama">Drama</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Language
                </label>
                <select
                  name="language"
                  defaultValue={film.language}
                  className={inputClass}
                >
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Korean">Korean</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Quality
                </label>
                <select
                  name="quality"
                  defaultValue={film.quality}
                  className={inputClass}
                >
                  <option value="480p">480p</option>
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                  <option value="4K">4K</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Poster Image URL
                </label>
                <input
                  name="poster_url"
                  defaultValue={film.poster_url}
                  onChange={(e) => setPoster(e.target.value)}
                  placeholder="Paste poster image URL"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-zinc-400">
                Google Drive Download Link
              </label>
              <input
                name="drive_link"
                defaultValue={film.drive_link}
                className={inputClass}
                required
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-zinc-400">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={film.description}
                rows={6}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button className="mt-6 w-full rounded-2xl bg-red-600 py-4 font-bold shadow-lg shadow-red-600/20 hover:bg-red-700">
              Update Film
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}