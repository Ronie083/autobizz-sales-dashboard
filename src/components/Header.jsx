import React from 'react';
import { RefreshCw } from 'lucide-react';

export const Header = ({ token }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sales<span className="text-indigo-600">Dash</span></h1>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${token ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    API Status: {token ? 'Connected' : 'Authorizing...'}
                </div>
            </div>
        </header>
    );
};
