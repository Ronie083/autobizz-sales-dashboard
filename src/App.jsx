import React, { useState } from 'react';
import { useSalesData } from './hooks/useSalesData';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { SalesChart } from './components/SalesChart';
import { SalesTable } from './components/SalesTable';

const App = () => {
  const [filters, setFilters] = useState({
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    priceMin: '',
    email: '',
    phone: ''
  });

  const [sortConfig, setSortConfig] = useState({ sortBy: 'date', sortOrder: 'asc' });
  const [cursor, setCursor] = useState({ type: null, token: null });

  const { salesData, chartData, paginationInfo, loading, error, token } = useSalesData(filters, sortConfig, cursor);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCursor({ type: null, token: null });
  };

  const clearFilters = () => {
    setFilters({ startDate: '2025-01-01', endDate: '2025-01-31', priceMin: '', email: '', phone: '' });
    setCursor({ type: null, token: null });
  };

  const handleSort = (column) => {
    setSortConfig(prev => ({ sortBy: column, sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc' }));
    setCursor({ type: null, token: null });
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && paginationInfo.after) setCursor({ type: 'after', token: paginationInfo.after });
    else if (direction === 'prev' && paginationInfo.before) setCursor({ type: 'before', token: paginationInfo.before });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header token={token} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">{error}</div>}
        <Filters filters={filters} handleFilterChange={handleFilterChange} clearFilters={clearFilters} />
        <SalesChart chartData={chartData} loading={loading} />
        <SalesTable
          salesData={salesData}
          loading={loading}
          paginationInfo={paginationInfo}
          handlePageChange={handlePageChange}
          sortConfig={sortConfig}
          handleSort={handleSort}
          filters={filters}
        />
      </main>
    </div>
  );
};

export default App;
