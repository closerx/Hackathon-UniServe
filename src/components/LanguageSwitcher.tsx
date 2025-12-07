'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex gap-2 text-sm">
            <button
                onClick={() => switchLocale('ar')}
                className={`px-3 py-1 rounded-full transition-colors ${locale === 'ar' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
            >
                العربية
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1 rounded-full transition-colors ${locale === 'en' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
            >
                English
            </button>
        </div>
    );
}
