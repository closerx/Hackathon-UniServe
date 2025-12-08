'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { useState } from 'react';

const ministries = ['commerce', 'justice', 'health', 'education', 'hrsd', 'traffic'];

const ministryIcons: Record<string, string> = {
    commerce: '🏢',
    justice: '⚖️',
    health: '🏥',
    education: '🎓',
    hrsd: '👥',
    traffic: '🚗'
};

const ministryGradients: Record<string, string> = {
    commerce: 'from-indigo-500 to-purple-500',
    justice: 'from-amber-500 to-orange-500',
    health: 'from-red-500 to-pink-500',
    education: 'from-blue-500 to-cyan-500',
    hrsd: 'from-green-500 to-emerald-500',
    traffic: 'from-purple-500 to-violet-500'
};

// Map each ministry to its primary endpoint key in translations
const ministryEndpoints: Record<string, string[]> = {
    commerce: ['verify', 'details'],
    justice: ['poa', 'deed'],
    health: ['practitioner'],
    education: ['certificate'],
    hrsd: ['nitaqat'],
    traffic: ['license', 'vehicle']
};

// Map each ministry to its endpoint path
const ministryEndpointPaths: Record<string, string[]> = {
    commerce: ['/commerce/verify/:crNumber', '/commerce/details/:crNumber'],
    justice: ['/justice/poa/:poaNumber', '/justice/deed/:deedNumber'],
    health: ['/health/practitioner/:licenseNumber'],
    education: ['/education/certificate/:certificateNumber'],
    hrsd: ['/hrsd/nitaqat/:establishmentNumber'],
    traffic: ['/traffic/license/:licenseNumber', '/traffic/vehicle/:plateNumber']
};

type CodeTab = 'javascript' | 'python' | 'curl';

export default function DocsPage() {
    const t = useTranslations('Docs');
    const [activeMinistry, setActiveMinistry] = useState<string | null>(null);
    const [copiedCode, setCopiedCode] = useState(false);
    const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>('javascript');
    const [tryItInput, setTryItInput] = useState('');
    const [tryItResult, setTryItResult] = useState<string | null>(null);
    const [tryItLoading, setTryItLoading] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const getCodeExample = (ministry: string, tab: CodeTab) => {
        const endpoint = ministryEndpointPaths[ministry]?.[0] || '/verify/:id';
        const baseUrl = 'https://api.uniserve.sa/v1';

        switch (tab) {
            case 'javascript':
                return `// JavaScript / Node.js
const response = await fetch(
  '${baseUrl}${endpoint.replace(':' + endpoint.split(':')[1], '1234567890')}',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

const data = await response.json();
console.log(data);`;

            case 'python':
                return `# Python
import requests

url = "${baseUrl}${endpoint.replace(':' + endpoint.split(':')[1], '1234567890')}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`;

            case 'curl':
                return `# cURL
curl -X GET \\
  "${baseUrl}${endpoint.replace(':' + endpoint.split(':')[1], '1234567890')}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;
        }
    };

    const getResponseExample = (ministry: string) => {
        const responses: Record<string, object> = {
            commerce: {
                success: true,
                data: {
                    crNumber: "1010123456",
                    name: "شركة المثال للتقنية",
                    nameEn: "Example Tech Company",
                    type: "LLC",
                    status: "active",
                    issueDate: "2020-01-15",
                    expiryDate: "2025-01-15"
                }
            },
            justice: {
                success: true,
                data: {
                    poaNumber: "123456789",
                    type: "general",
                    status: "valid",
                    issueDate: "2024-01-01",
                    expiryDate: "2025-01-01"
                }
            },
            health: {
                success: true,
                data: {
                    licenseNumber: "HP12345",
                    name: "د. أحمد محمد",
                    specialty: "طب عام",
                    status: "active"
                }
            },
            education: {
                success: true,
                data: {
                    certificateNumber: "EDU123456",
                    degree: "بكالوريوس",
                    major: "علوم الحاسب",
                    university: "جامعة الملك سعود",
                    graduationYear: 2022
                }
            },
            hrsd: {
                success: true,
                data: {
                    establishmentNumber: "12345",
                    nitaqatRange: "platinum",
                    saudizationRate: 45,
                    totalEmployees: 150
                }
            },
            traffic: {
                success: true,
                data: {
                    licenseNumber: "DL123456",
                    type: "private",
                    status: "valid",
                    expiryDate: "2026-05-15"
                }
            }
        };
        return JSON.stringify(responses[ministry] || responses.commerce, null, 2);
    };

    const handleTryIt = async () => {
        if (!activeMinistry || !tryItInput) return;

        setTryItLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockResponse = {
            success: true,
            message: "Demo response - في الإنتاج ستحصل على بيانات حقيقية",
            requestedId: tryItInput,
            ministry: activeMinistry,
            timestamp: new Date().toISOString()
        };

        setTryItResult(JSON.stringify(mockResponse, null, 2));
        setTryItLoading(false);
    };

    return (
        <div className="min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
                </div>

                {/* Quick Start Section */}
                <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-xl">🚀</span>
                        {t('gettingStarted')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Step 1 */}
                        <div className="bg-white/5 rounded-xl p-6">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
                            <h3 className="text-lg font-semibold text-white mb-2">{t('quickStart.step1Title')}</h3>
                            <p className="text-gray-400 text-sm mb-4">{t('quickStart.step1Desc')}</p>
                            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                                {t('quickStart.createAccount')} →
                            </Link>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white/5 rounded-xl p-6">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
                            <h3 className="text-lg font-semibold text-white mb-2">{t('quickStart.step2Title')}</h3>
                            <p className="text-gray-400 text-sm mb-4">{t('quickStart.step2Desc')}</p>
                            <code className="text-xs bg-slate-800 px-2 py-1 rounded text-green-400">API_KEY=us_live_xxx</code>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white/5 rounded-xl p-6">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
                            <h3 className="text-lg font-semibold text-white mb-2">{t('quickStart.step3Title')}</h3>
                            <p className="text-gray-400 text-sm mb-4">{t('quickStart.step3Desc')}</p>
                            <code className="text-xs bg-slate-800 px-2 py-1 rounded text-indigo-400">Authorization: Bearer YOUR_KEY</code>
                        </div>
                    </div>
                </div>

                {/* SDK Section */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">📦</span>
                            {t('sdk.title')}
                        </h2>
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                            {t('sdk.comingSoon')}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* JavaScript SDK */}
                        <div className="bg-slate-800/50 rounded-xl p-6 flex items-center gap-4 opacity-60">
                            <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-yellow-400 font-bold text-xl">JS</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">JavaScript</h3>
                                <span className="text-gray-500 text-sm">Node.js / Browser</span>
                            </div>
                        </div>

                        {/* Python SDK */}
                        <div className="bg-slate-800/50 rounded-xl p-6 flex items-center gap-4 opacity-60">
                            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-400 font-bold text-xl">PY</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Python</h3>
                                <span className="text-gray-500 text-sm">Python 3.8+</span>
                            </div>
                        </div>

                        {/* PHP SDK */}
                        <div className="bg-slate-800/50 rounded-xl p-6 flex items-center gap-4 opacity-60">
                            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-purple-400 font-bold text-xl">PHP</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">PHP</h3>
                                <span className="text-gray-500 text-sm">PHP 8.0+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Base URL */}
                <div className="bg-slate-800/50 rounded-xl p-4 mb-8 flex items-center justify-between">
                    <div>
                        <span className="text-gray-400 text-sm">{t('baseUrl')}</span>
                        <code className="block text-indigo-400 font-mono mt-1">https://api.uniserve.sa/v1</code>
                    </div>
                    <button
                        onClick={() => copyToClipboard('https://api.uniserve.sa/v1')}
                        className="px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/20 transition-colors"
                    >
                        {copiedCode ? t('copied') : t('copyCode')}
                    </button>
                </div>

                {/* Ministry Selector */}
                <h2 className="text-2xl font-bold text-white mb-6">{t('selectMinistry')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {ministries.map((ministry) => (
                        <button
                            key={ministry}
                            onClick={() => {
                                setActiveMinistry(activeMinistry === ministry ? null : ministry);
                                setTryItResult(null);
                                setTryItInput('');
                            }}
                            className={`p-4 rounded-xl border transition-all text-center ${activeMinistry === ministry
                                ? 'bg-indigo-600/30 border-indigo-500 shadow-lg shadow-indigo-500/20'
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${ministryGradients[ministry]} rounded-xl flex items-center justify-center text-2xl`}>
                                {ministryIcons[ministry]}
                            </div>
                            <span className="text-white font-medium text-sm">{t(`ministries.${ministry}.name`)}</span>
                        </button>
                    ))}
                </div>

                {/* Ministry Documentation */}
                {activeMinistry && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 animate-in fade-in duration-300">
                        {/* Ministry Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-br ${ministryGradients[activeMinistry]} rounded-xl flex items-center justify-center text-3xl`}>
                                {ministryIcons[activeMinistry]}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{t(`ministries.${activeMinistry}.name`)}</h3>
                                <p className="text-gray-400">{t(`ministries.${activeMinistry}.description`)}</p>
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="mb-8">
                            <p className="text-gray-300 leading-relaxed">{t(`ministries.${activeMinistry}.overview`)}</p>
                        </div>

                        {/* Endpoints Table */}
                        <h4 className="text-xl font-bold text-white mb-4">{t('endpoints')}</h4>
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-start py-3 px-4 text-gray-400 font-medium">{t('method')}</th>
                                        <th className="text-start py-3 px-4 text-gray-400 font-medium">{t('endpoint')}</th>
                                        <th className="text-start py-3 px-4 text-gray-400 font-medium">{t('description_label')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ministryEndpoints[activeMinistry]?.map((endpoint, index) => (
                                        <tr key={endpoint} className="border-b border-white/5">
                                            <td className="py-3 px-4">
                                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">GET</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <code className="text-indigo-400 font-mono text-sm">{ministryEndpointPaths[activeMinistry]?.[index]}</code>
                                            </td>
                                            <td className="py-3 px-4 text-gray-300">{t(`ministries.${activeMinistry}.endpoints.${endpoint}.description`)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Code Example with Tabs */}
                        <h4 className="text-xl font-bold text-white mb-4">{t('requestExample')}</h4>
                        <div className="bg-slate-900 rounded-xl overflow-hidden mb-8">
                            {/* Tabs */}
                            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-white/10">
                                <div className="flex gap-2">
                                    {(['javascript', 'python', 'curl'] as CodeTab[]).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveCodeTab(tab)}
                                            className={`px-3 py-1 rounded text-sm transition-colors ${activeCodeTab === tab
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {tab === 'javascript' ? 'JavaScript' : tab === 'python' ? 'Python' : 'cURL'}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(getCodeExample(activeMinistry, activeCodeTab))}
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    {copiedCode ? '✓' : '📋'}
                                </button>
                            </div>
                            <pre className="p-4 text-sm overflow-x-auto">
                                <code className="text-gray-300">{getCodeExample(activeMinistry, activeCodeTab)}</code>
                            </pre>
                        </div>

                        {/* Try It Out Section */}
                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-sm">▶</span>
                            {t('tryItOut')}
                        </h4>
                        <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <input
                                    type="text"
                                    value={tryItInput}
                                    onChange={(e) => setTryItInput(e.target.value)}
                                    placeholder={t('tryItPlaceholder')}
                                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={handleTryIt}
                                    disabled={!tryItInput || tryItLoading}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/25 transition-all"
                                >
                                    {tryItLoading ? '⏳' : '▶'} {t('sendRequest')}
                                </button>
                            </div>

                            {tryItResult && (
                                <div className="bg-slate-900 rounded-lg p-4 border border-green-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-green-400 text-sm font-medium">✓ Response</span>
                                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">200 OK</span>
                                    </div>
                                    <pre className="text-sm text-gray-300 overflow-x-auto">
                                        <code>{tryItResult}</code>
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Response Example */}
                        <h4 className="text-xl font-bold text-white mb-4">{t('responseExample')}</h4>
                        <div className="bg-slate-900 rounded-xl overflow-hidden mb-8">
                            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-white/10">
                                <span className="text-sm text-gray-500">JSON Response</span>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">200 OK</span>
                            </div>
                            <pre className="p-4 text-sm overflow-x-auto">
                                <code className="text-gray-300">{getResponseExample(activeMinistry)}</code>
                            </pre>
                        </div>

                        {/* Error Codes */}
                        <h4 className="text-xl font-bold text-white mb-4">{t('errorCodes')}</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-start py-3 px-4 text-gray-400 font-medium">{t('code')}</th>
                                        <th className="text-start py-3 px-4 text-gray-400 font-medium">{t('meaning')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['400', '401', '403', '404', '429', '500'].map((code) => (
                                        <tr key={code} className="border-b border-white/5">
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded text-sm font-mono ${code.startsWith('4') ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                                                    }`}>{code}</span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-300">{t(`errors.${code}`)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-1"
                    >
                        {t('quickStart.createAccount')} →
                    </Link>
                </div>
            </div>
        </div>
    );
}
