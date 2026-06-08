import { getFilms } from "@/lib/films";
import FilmsClient from "./FilmsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const revalidate = 60;

export default async function FilmsPage() {
  const films = await getFilms();

  return <>
  <Navbar/>
  <FilmsClient films={films} />
  <Footer/>;</>
}