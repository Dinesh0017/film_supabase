import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Globe, Star, Download } from 'lucide-react';
import { Film } from '@/types';

interface FilmCardProps {
    film: Film;
}

const qualityColors: Record<string, string> = {
    '4K': 'bg-purple-600/80 text-purple-100',
    '1080p': 'bg-blue-600/80 text-blue-100',
    '720p': 'bg-green-600/80 text-green-100',
    '480p': 'bg-yellow-600/80 text-yellow-100',
    'CAM': 'bg-red-700/80 text-red-100',
};

export default function FilmCard({ film }: FilmCardProps) {
    const qualityClass =
        qualityColors[film.quality] ?? 'bg-gray-600/80 text-gray-100';

    return (
        <div className="card group cursor-pointer">
            <Link href={`/films/${film.id}`} className="block">
                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                    <Image
                        src={film.posterUrl}
                        alt={film.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        unoptimized
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Quality Badge */}
                    <span
                        className={`absolute top-2 right-2 badge font-bold text-xs ${qualityClass}`}
                    >
                        {film.quality}
                    </span>

                    {/* Category Badge */}
                    <span className="absolute top-2 left-2 badge bg-red-600/80 text-red-100 text-xs">
                        {film.category}
                    </span>
                </div>

                {/* Info */}
                <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-sm text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {film.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {film.year}
                        </span>
                        <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" /> {film.language}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Download Button */}
            <div className="px-3 pb-3">
                <Link
                    href={`/films/${film.id}`}
                    className="btn-primary w-full justify-center text-sm py-2"
                >
                    <Download className="w-4 h-4" />
                    Download
                </Link>
            </div>
        </div>
    );
}
