'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
    const t = useTranslations('Auth');
    const tNav = useTranslations('Navigation');
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">U</div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            Uniserve
                        </span>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-white">
                        {t('loginTitle')}
                    </h2>
                </div>

                {/* Form Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <form className="space-y-6" action={formAction}>
                        {errorMessage && (
                            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-center text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('email')}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder={t('email')}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('password')}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder={t('password')}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 transition-all"
                        >
                            {isPending ? t('signingIn') : t('signIn')}
                        </button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="text-center space-y-3">
                    <Link href="/register" className="block text-indigo-400 hover:text-indigo-300 transition-colors">
                        {t('noAccount')}
                    </Link>
                    <Link href="/" className="block text-gray-500 hover:text-gray-300 transition-colors text-sm">
                        ← {tNav('home')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
