'use client';

import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';

export default function Navbar() {
    const t = useTranslations('Navigation');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="backdrop-blur-xl bg-slate-900/80 sticky top-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                Uniserve
                            </span>
                        </Link>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8 sm:rtl:space-x-reverse items-center">
                            <Link href="/solutions" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t('solutions')}</Link>
                            <Link href="/api-docs" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t('docs')}</Link>
                            <Link href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t('pricing')}</Link>
                            <Link href="/developers" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t('developers')}</Link>
                            <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">{t('about')}</Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link
                            href="/login"
                            className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                        >
                            {t('login')}
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5"
                        >
                            {t('getStarted')}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/solutions" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">{t('solutions')}</Link>
                        <Link href="/api-docs" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">{t('docs')}</Link>
                        <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">{t('pricing')}</Link>
                        <Link href="/developers" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">{t('developers')}</Link>
                        <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">{t('about')}</Link>
                        <div className="pt-4 pb-2 px-3">
                            <Link
                                href="/register"
                                className="block w-full text-center px-4 py-3 rounded-full text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all"
                            >
                                {t('getStarted')}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
