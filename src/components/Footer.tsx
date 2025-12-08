'use client';

import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Navigation');
    const tFooter = useTranslations('Footer');

    return (
        <footer className="bg-slate-900/50 border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('solutions')}</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/solutions" className="text-base text-gray-500 hover:text-white transition-colors">{t('solutions')}</Link></li>
                            <li><Link href="/solutions" className="text-base text-gray-500 hover:text-white transition-colors">{tFooter('enterprise')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('developers')}</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/developers" className="text-base text-gray-500 hover:text-white transition-colors">{tFooter('documentation')}</Link></li>
                            <li><Link href="/developers" className="text-base text-gray-500 hover:text-white transition-colors">{tFooter('apiReference')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{t('company')}</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link href="/about" className="text-base text-gray-500 hover:text-white transition-colors">{t('about')}</Link></li>
                            <li><Link href="/pricing" className="text-base text-gray-500 hover:text-white transition-colors">{t('pricing')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                Uniserve
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        {tFooter('allRights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
