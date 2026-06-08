export interface Film {
  id: number;
  title: string;
  description: string;
  category: string;
  language: string;
  year: number;
  quality: string;
  posterUrl: string;
  driveLink: string;
  createdAt: string;
  updatedAt: string;
}

export type FilmCreateInput = Omit<Film, 'id' | 'createdAt' | 'updatedAt'>;
export type FilmUpdateInput = Partial<FilmCreateInput>;
