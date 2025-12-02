import React from 'react';
import { Filter, Calendar, DollarSign, Mail, Phone } from 'lucide-react';

export const Filters = ({ filters, handleFilterChange, clearFilters }) => {
    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                </h2>
                <button
                    onClick={clearFilters}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    Reset All
                </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Start Date', name: 'startDate', type: 'date', icon: Calendar },
                    { label: 'End Date', name: 'endDate', type: 'date', icon: Calendar },
                    { label: 'Min Price', name: 'priceMin', type: 'number', icon: DollarSign },
                    { label: 'Email', name: 'email', type: 'email', icon: Mail },
                    { label: 'Phone', name: 'phone', type: 'tel', icon: Phone }
                ].map(({ label, name, type, icon: Icon }) => (
                    <div key={name} className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                        <div className="relative">
                            <Icon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type={type}
                                name={name}
                                placeholder={label}
                                value={filters[name]}
                                onChange={handleFilterChange}
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
