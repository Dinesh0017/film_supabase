import { supabaseAdmin } from '@/lib/supabase';
import type { Film } from '@/types';
import type { Database } from '@/types/database';

type FilmRow = Database['public']['Tables']['films']['Row'];
type FilmInsert = Database['public']['Tables']['films']['Insert'];
type FilmUpdate = Database['public']['Tables']['films']['Update'];

export function mapFilm(row: FilmRow): Film {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    language: row.language,
    year: row.year,
    quality: row.quality,
    posterUrl: row.poster_url,
    driveLink: row.drive_link,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getFilms(): Promise<Film[]> {
  const { data, error } = await supabaseAdmin
    .from('films')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapFilm);
}

export async function getFilmById(id: number): Promise<Film | null> {
  const { data, error } = await supabaseAdmin
    .from('films')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }

  return data ? mapFilm(data) : null;
}

export async function getRelatedFilms(category: string, currentId: number): Promise<Film[]> {
  const { data, error } = await supabaseAdmin
    .from('films')
    .select('*')
    .eq('category', category)
    .neq('id', currentId)
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapFilm);
}

export async function createFilm(input: FilmInsert): Promise<Film> {
  const { data, error } = await supabaseAdmin
    .from('films')
    .insert(input)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return mapFilm(data);
}

export async function updateFilm(id: number, input: FilmUpdate): Promise<Film> {
  const { data, error } = await supabaseAdmin
    .from('films')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return mapFilm(data);
}

export async function deleteFilm(id: number): Promise<void> {
  const { error } = await supabaseAdmin.from('films').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
