import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'FilmHub – Stream & Download Movies',
    description:
        'FilmHub is your ultimate destination to discover and download the latest movies in HD quality. Browse by category, language, and year.',
    keywords: 'movies, download, HD, streaming, films, cinema',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body>{children}</body>
        </html>
    );
}
