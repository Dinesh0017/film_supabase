import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("filmhub_admin")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/admin/dashboard", request.url));
}