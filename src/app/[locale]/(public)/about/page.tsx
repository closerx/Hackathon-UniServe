import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('About');

    return (
        <div className="py-24 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('title')}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Content Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        {t('content')}
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl mb-6">
                            🎯
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{t('mission')}</h3>
                        <p className="text-gray-400">{t('missionText')}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 rounded-2xl p-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl mb-6">
                            🔮
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{t('vision')}</h3>
                        <p className="text-gray-400">{t('visionText')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
