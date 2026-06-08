import { Film } from 'lucide-react';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-16 border-t border-gray-800/60 bg-gray-950/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <Film className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-extrabold tracking-tight">
                            <span className="text-white">Film</span>
                            <span className="text-red-500">Hub</span>
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm text-center">
                        &copy; {year} FilmHub. For educational purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
}
