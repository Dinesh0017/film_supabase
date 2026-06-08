import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export default async function AdminFilmsPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("filmhub_admin")?.value === "true";

  if (!isAdmin) {
    redirect("/admin");
  }

  const { data: films, error } = await supabaseAdmin
    .from("films")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <p className="text-red-400">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">
              FilmHub Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold">Manage Films</h1>
          </div>

          <Link
            href="/admin/films/add"
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            + Add Film
          </Link>
        </div>

        {!films || films.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center">
            <p className="text-zinc-400">No films added yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {films.map((film: any) => (
              <div
                key={film.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
              >
                <img
                  src={film.poster_url || "/placeholder.jpg"}
                  alt={film.title}
                  className="h-72 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-lg font-bold">{film.title}</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {film.category} • {film.language} • {film.quality}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/admin/films/edit/${film.id}`}
                      className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/film/${film.id}`}
                      className="flex-1 rounded-xl bg-zinc-800 px-4 py-2 text-center text-sm font-semibold hover:bg-zinc-700"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}