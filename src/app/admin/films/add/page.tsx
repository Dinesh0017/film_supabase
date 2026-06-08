import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AddFilmPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("filmhub_admin")?.value === "true";

  if (!isAdmin) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">
              FilmHub Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold">Add New Film</h1>
          </div>

          <Link
            href="/admin/dashboard"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/10"
          >
            Back Dashboard
          </Link>
        </div>

        <form
          action="/api/admin/films"
          method="POST"
          className="rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Film Title
              </label>
              <input
                name="title"
                required
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
                placeholder="Movie name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
              >
                <option value="">Select Category</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Drama">Drama</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Language
              </label>
              <select
                name="language"
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">Year</label>
              <input
                name="year"
                type="number"
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
                placeholder="2025"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Quality
              </label>
              <select
                name="quality"
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
              >
                <option value="">Select Quality</option>
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
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
                placeholder="https://image-link.com/poster.jpg"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-zinc-400">
              Google Drive Download Link
            </label>
            <input
              name="drive_link"
              required
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm text-zinc-400">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
              placeholder="Film description..."
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-red-600 px-5 py-4 font-bold text-white transition hover:bg-red-700"
          >
            Save Film
          </button>
        </form>
      </div>
    </main>
  );
}
