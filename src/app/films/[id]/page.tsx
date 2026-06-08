import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function FilmDetailsPage({ params }: PageProps) {
  const { data: film, error } = await supabaseAdmin
    .from("films")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !film) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-zinc-400 hover:text-red-500">
          ← Back to Home
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-[350px_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
            <img
              src={film.poster_url || "/placeholder.jpg"}
              alt={film.title}
              className="h-[520px] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">
              {film.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-6xl">
              {film.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                {film.language || "Unknown"}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                {film.year || "N/A"}
              </span>
              <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold">
                {film.quality || "HD"}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300">
              {film.description || "No description available."}
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <h2 className="text-xl font-bold">Download Movie</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Click the button below to open the Google Drive download link.
              </p>

              <a
                href={film.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full justify-center rounded-xl bg-red-600 px-6 py-4 font-bold text-white transition hover:bg-red-700 md:w-auto"
              >
                Download Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}