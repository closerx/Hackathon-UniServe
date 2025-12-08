import { useTranslations } from 'next-intl';

export default function SolutionsPage() {
    const t = useTranslations('Solutions');
    const sectors = ['commerce', 'justice', 'health', 'education', 'hrsd', 'traffic'];

    const sectorData: Record<string, { icon: string; gradient: string }> = {
        commerce: { icon: "🏢", gradient: "from-indigo-500 to-purple-500" },
        justice: { icon: "⚖️", gradient: "from-amber-500 to-orange-500" },
        health: { icon: "🏥", gradient: "from-red-500 to-pink-500" },
        education: { icon: "🎓", gradient: "from-blue-500 to-cyan-500" },
        hrsd: { icon: "👥", gradient: "from-green-500 to-emerald-500" },
        traffic: { icon: "🚗", gradient: "from-purple-500 to-violet-500" }
    };

    return (
        <div className="py-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
                </div>

                {/* Sector Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sectors.map((sector) => (
                        <div
                            key={sector}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${sectorData[sector].gradient} rounded-xl mb-6 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                                {sectorData[sector].icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{t(`sectors.${sector}`)}</h3>
                            <p className="text-gray-400 leading-relaxed">{t(`sectors.${sector}_desc`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
