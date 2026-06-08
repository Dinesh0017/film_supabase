export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      films: {
        Row: {
          id: number;
          title: string;
          description: string;
          category: string;
          language: string;
          year: number;
          quality: string;
          poster_url: string;
          drive_link: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          category: string;
          language: string;
          year: number;
          quality: string;
          poster_url: string;
          drive_link: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          category?: string;
          language?: string;
          year?: number;
          quality?: string;
          poster_url?: string;
          drive_link?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
