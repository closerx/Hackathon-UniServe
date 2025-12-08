import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export default function PricingPage() {
    const t = useTranslations('Pricing');
    const navT = useTranslations('Navigation');

    const plans = [
        {
            name: 'free',
            price: '0',
            requests: '500',
            features: ['basicSupport', 'basicApis'],
            popular: false
        },
        {
            name: 'basic',
            price: '99',
            requests: '10,000',
            features: ['prioritySupport', 'allApis'],
            popular: true
        },
        {
            name: 'enterprise',
            price: 'custom',
            requests: 'unlimited',
            features: ['dedicatedSupport', 'customApis'],
            popular: false
        }
    ];

    return (
        <div className="py-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
                    <p className="text-xl text-gray-400">{t('subtitle')}</p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-2 ${plan.popular
                                    ? 'bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20'
                                    : 'bg-white/5 border border-white/10'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-sm font-semibold text-white">
                                    Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-2">{t(plan.name)}</h3>

                            <div className="mb-6">
                                {plan.price === 'custom' ? (
                                    <div className="text-4xl font-extrabold text-white">{t('contactSales')}</div>
                                ) : (
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                            ${plan.price}
                                        </span>
                                        <span className="ms-2 text-gray-400">/{t('monthlyPrice')}</span>
                                    </div>
                                )}
                            </div>

                            <div className="text-gray-400 mb-6">
                                {plan.requests === 'unlimited' ? '∞' : plan.requests} {t('requests')} / {t('perMonth')}
                            </div>

                            <ul className="mb-8 space-y-4 flex-grow">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-gray-300">
                                        <span className="text-green-400 me-3">✓</span>
                                        {t(`features.${feature}`)}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/register"
                                className={`text-center px-6 py-3 rounded-xl font-semibold transition-all ${plan.popular
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {plan.price === 'custom' ? t('contactSales') : t('selectPlan')}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
