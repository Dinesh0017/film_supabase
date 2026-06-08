'use client';

interface CategoryFilterProps {
    categories: string[];
    selected: string;
    onChange: (cat: string) => void;
}

export default function CategoryFilter({
    categories,
    selected,
    onChange,
}: CategoryFilterProps) {
    const all = ['All', ...categories];

    return (
        <div className="flex flex-wrap gap-2">
            {all.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onChange(cat === 'All' ? '' : cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${(cat === 'All' && !selected) || selected === cat
                            ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20'
                            : 'bg-gray-800/60 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
