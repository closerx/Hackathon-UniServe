'use client';

import { useState, useEffect } from 'react';

type ApiKey = {
    id: string;
    name: string;
    key: string;
    level: number;
    isActive: boolean;
    createdAt: string;
};

export default function KeyManager() {
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState('');
    const [newLevel, setNewLevel] = useState(1);

    const fetchKeys = async () => {
        const res = await fetch('/api/keys');
        if (res.ok) {
            const data = await res.json();
            setKeys(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    const createKey = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/keys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, level: Number(newLevel) }),
        });
        if (res.ok) {
            setNewName('');
            fetchKeys();
        }
    };

    const deleteKey = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const res = await fetch(`/api/keys/${id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            fetchKeys();
        }
    };

    if (loading) return <div>Loading keys...</div>;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <div className="mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Create New API Key</h3>
                <form onSubmit={createKey} className="mt-4 flex gap-4">
                    <input
                        type="text"
                        placeholder="Key Name (e.g. Production)"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                        required
                    />
                    <select
                        value={newLevel}
                        onChange={(e) => setNewLevel(Number(e.target.value))}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md border p-2"
                    >
                        <option value={1}>Level 1 (Public)</option>
                        <option value={2}>Level 2 (Basic)</option>
                        <option value={3}>Level 3 (Sensitive)</option>
                        <option value={4}>Level 4 (Write)</option>
                    </select>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                        Create
                    </button>
                </form>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your API Keys</h3>
                <ul className="divide-y divide-gray-200">
                    {keys.map((key) => (
                        <li key={key.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-indigo-600">{key.name}</p>
                                <div className="flex items-center gap-2">
                                    <code className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{key.key}</code>
                                    <span className="text-xs text-gray-400">Level {key.level}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteKey(key.id)}
                                className="text-red-600 hover:text-red-900 text-sm"
                            >
                                Revoke
                            </button>
                        </li>
                    ))}
                    {keys.length === 0 && <p className="text-gray-500 text-sm">No keys found.</p>}
                </ul>
            </div>
        </div>
    );
}
