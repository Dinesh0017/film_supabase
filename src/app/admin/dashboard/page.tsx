import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("filmhub_admin")?.value === "true";
  const { count } = await supabaseAdmin
    .from("films")
    .select("*", { count: "exact", head: true });

  const { data: films } = await supabaseAdmin.from("films").select("category");

  const categoryCount = new Set(films?.map((f) => f.category)).size || 0;

  if (!isAdmin) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-red-600/20 to-zinc-900 p-6 shadow-2xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">
              FilmHub Admin
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Admin Dashboard 🎬
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Manage films, categories, poster images, and download links.
            </p>
          </div>

          <Link
            href="/admin/films/add"
            className="rounded-2xl bg-red-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-red-700"
          >
            + Add New Film
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
            <p className="text-sm text-zinc-400">Total Films</p>
            <h2 className="mt-3 text-4xl font-bold">{count || 0}</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Films added to your website
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
            <p className="text-sm text-zinc-400">Categories</p>
            <h2 className="mt-3 text-4xl font-bold">{categoryCount}</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Action, Comedy, Horror, etc.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
            <p className="text-sm text-zinc-400">Storage Type</p>
            <h2 className="mt-3 text-3xl font-bold">Drive</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Films download from Google Drive links
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link
            href="/admin/films/"
            className="group rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl transition hover:border-red-500/60 hover:bg-zinc-800"
          >
            <h3 className="text-xl font-bold group-hover:text-red-400">
              Manage Films
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              View, edit, and delete uploaded film records.
            </p>
          </Link>

          <Link
            href="/admin/films/add"
            className="group rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl transition hover:border-red-500/60 hover:bg-zinc-800"
          >
            <h3 className="text-xl font-bold group-hover:text-red-400">
              Add Film
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              Add title, poster URL, category, quality, and Drive link.
            </p>
          </Link>
        </div>

        {/* Admin Note */}
        <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-5">
          <h3 className="font-semibold text-yellow-300">Admin Note</h3>
          <p className="mt-2 text-sm text-yellow-100/80">
            Public users cannot see this dashboard. Only admins with the correct
            password can access this page.
          </p>
        </div>
      </div>
    </main>
  );
}
