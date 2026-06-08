import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import EditFilmForm from "./EditFilmForm";

export default async function EditFilmPage({ params }: any) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("filmhub_admin")?.value === "true";

  if (!isAdmin) redirect("/admin");

  const { data: film } = await supabaseAdmin
    .from("films")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!film) redirect("/admin/films");

  return <EditFilmForm film={film} />;
}