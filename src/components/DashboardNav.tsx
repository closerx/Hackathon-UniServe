'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function DashboardNav({ user }: { user: any }) {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600">Uniserve</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/dashboard" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Dashboard
                            </Link>
                            <Link href="/docs" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Docs
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-700 text-sm mr-4">Hello, {user?.name}</span>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
