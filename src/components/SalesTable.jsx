import React from 'react';
import { Loader2, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

export const SalesTable = ({ salesData, loading, paginationInfo, handlePageChange, sortConfig, handleSort, filters }) => {
    const SortIcon = ({ column }) => {
        if (sortConfig.sortBy !== column) return <ArrowUpDown className="w-4 h-4 text-gray-400 ml-1" />;
        return sortConfig.sortOrder === 'asc'
            ? <ArrowUp className="w-4 h-4 text-indigo-600 ml-1" />
            : <ArrowDown className="w-4 h-4 text-indigo-600 ml-1" />;
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Sales Record</h2>
                <div className="text-sm text-gray-500">
                    Showing results for <span className="font-medium text-gray-900">{filters.startDate}</span> to <span className="font-medium text-gray-900">{filters.endDate}</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider font-semibold">
                        <tr>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('date')}>
                                <div className="flex items-center">Date <SortIcon column="date" /></div>
                            </th>
                            <th className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('price')}>
                                <div className="flex items-center">Price <SortIcon column="price" /></div>
                            </th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Item</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && salesData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                    <Loader2 className="w-6 h-6 animate-spin inline-block mr-2" /> Loading records...
                                </td>
                            </tr>
                        ) : salesData.length > 0 ? (
                            salesData.map((sale, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">{sale.date || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400 font-bold whitespace-nowrap text-indigo-600">${typeof sale.price === 'number' ? sale.price.toLocaleString() : sale.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-medium">{sale.customerName || 'Guest'}</span>
                                            <span className="text-xs text-gray-400">{sale.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{sale.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{sale.item || 'General Sale'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400">No sales records found matching filters</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">{salesData.length > 0 ? `${salesData.length} records on this page` : '0 records'}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange('prev')}
                        disabled={!paginationInfo.before || loading}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg border ${!paginationInfo.before || loading ? 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600 shadow-sm'} transition-all`}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </button>
                    <button
                        onClick={() => handlePageChange('next')}
                        disabled={!paginationInfo.after || loading}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg border ${!paginationInfo.after || loading ? 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600 shadow-sm'} transition-all`}
                    >
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};
