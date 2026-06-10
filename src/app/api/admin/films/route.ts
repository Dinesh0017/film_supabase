import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("filmhub_admin")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const film = {
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    category: String(formData.get("category") || ""),
    language: String(formData.get("language") || ""),
    year: Number(formData.get("year")) || null,
    quality: String(formData.get("quality") || ""),
    poster_url: String(formData.get("poster_url") || ""),
    drive_link: String(formData.get("drive_link") || ""),
  };

  const { error } = await supabaseAdmin.from("films").insert(film);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/admin/dashboard", request.url));
}