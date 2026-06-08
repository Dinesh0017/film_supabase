import HomeClient from './HomeClient';
import { getFilms } from '@/lib/films';

export const revalidate = 60;

export default async function HomePage() {
  const films = await getFilms();
  const categories = Array.from(new Set(films.map((film) => film.category))).sort();

  return <HomeClient films={films} categories={categories} />;
}
