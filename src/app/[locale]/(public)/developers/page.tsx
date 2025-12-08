import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export default function DevelopersPage() {
    const t = useTranslations('Developers');

    return (
        <div className="py-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Hero */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">{t('title')}</h1>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    {t('subtitle')}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <Link
                        href="/api-docs"
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-1"
                    >
                        📖 {t('readDocs')}
                    </Link>
                    <Link
                        href="/register"
                        className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:-translate-y-1"
                    >
                        🔑 {t('getKey')}
                    </Link>
                </div>

                {/* Code Snippet */}
                <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Window Controls */}
                    <div className="flex items-center px-4 py-3 bg-slate-900/80 border-b border-white/10">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="ms-4 text-sm text-gray-500">api-example.js</span>
                    </div>

                    {/* Code Content */}
                    <div className="p-6 text-start font-mono text-sm overflow-x-auto">
                        <p className="text-green-400">{t('codeComment')}</p>
                        <p className="mt-2">
                            <span className="text-purple-400">const</span>
                            <span className="text-white"> response </span>
                            <span className="text-pink-400">=</span>
                            <span className="text-purple-400"> await</span>
                            <span className="text-blue-400"> fetch</span>
                            <span className="text-white">(</span>
                        </p>
                        <p className="text-yellow-300 ps-4">&apos;https://uniserve.sa/api/gateway/commerce/verify/1010123456&apos;</p>
                        <p className="text-white">);</p>
                        <p className="mt-2">
                            <span className="text-purple-400">const</span>
                            <span className="text-white"> data </span>
                            <span className="text-pink-400">=</span>
                            <span className="text-purple-400"> await</span>
                            <span className="text-white"> response.</span>
                            <span className="text-blue-400">json</span>
                            <span className="text-white">();</span>
                        </p>
                        <p className="mt-4">
                            <span className="text-blue-400">console</span>
                            <span className="text-white">.</span>
                            <span className="text-blue-400">log</span>
                            <span className="text-white">(data);</span>
                        </p>
                        <p className="mt-2 text-gray-500">
                            {"// { valid: true, name: 'شركة المثال', type: 'LLC' }"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
