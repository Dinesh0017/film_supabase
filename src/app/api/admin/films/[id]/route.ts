import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("filmhub_admin")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Await the params to get the dynamic film ID
  const { id } = await context.params;

  const formData = await request.formData();

  const updatedFilm = {
    title: formData.get("title"),
    category: formData.get("category"),
    language: formData.get("language"),
    year: Number(formData.get("year")),
    quality: formData.get("quality"),
    poster_url: formData.get("poster_url"),
    drive_link: formData.get("drive_link"),
    description: formData.get("description"),
  };

  const { error } = await supabaseAdmin
    .from("films")
    .update(updatedFilm)
    .eq("id", id); // Used the awaited id here

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/admin/dashboard", request.url));
}