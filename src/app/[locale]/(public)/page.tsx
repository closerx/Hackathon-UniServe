import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export default function HomePage() {
    const t = useTranslations('Home');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-16 pb-20 md:pt-24 md:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300">{t('trustedBadge')}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        <span className="block text-white mb-2">{t('title')}</span>
                        <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {t('subtitle')}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10">
                        {t('description')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/register"
                            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1"
                        >
                            {t('startNow')}
                            <span className="inline-block ms-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                            href="/developers"
                            className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1"
                        >
                            📖 {t('docsButton')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features')}</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">{t('featuresSubtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                🔐
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('secureAuth')}</h3>
                            <p className="text-gray-400">{t('secureAuthDesc')}</p>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('realTimeData')}</h3>
                            <p className="text-gray-400">{t('realTimeDataDesc')}</p>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                🌐
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('unifiedGateway')}</h3>
                            <p className="text-gray-400">{t('unifiedGatewayDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-white/10 backdrop-blur-sm p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('stats')}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50+</div>
                                <div className="text-gray-400">{t('services')}</div>
                            </div>
                            <div className="group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">10K+</div>
                                <div className="text-gray-400">{t('activeDevelopers')}</div>
                            </div>
                            <div className="group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">99.9%</div>
                                <div className="text-gray-400">{t('uptimeSLA')}</div>
                            </div>
                            <div className="group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">24/7</div>
                                <div className="text-gray-400">{t('developerSupport')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('readyTitle')}</h2>
                    <p className="text-xl text-gray-400 mb-10">{t('readySubtitle')}</p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-xl shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1"
                    >
                        {t('getStartedFree')}
                        <span>→</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
