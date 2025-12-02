// src/hooks/useSalesData.jsx
import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE_URL = 'https://autobizz-425913.uc.r.appspot.com';

export const useSalesData = (filters, sortConfig, cursor) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [salesData, setSalesData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({ before: null, after: null });

    const dataCache = useRef({});

    // --- Get Authorization Token ---
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/getAuthorize`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tokenType: 'frontEndTest' })
                });

                if (!response.ok) throw new Error('Failed to authorize');

                const data = await response.json();
                setToken(data.token);
            } catch (err) {
                setError('Authorization failed. Please refresh the page.');
                console.error(err);
            }
        };

        fetchToken();
    }, []);

    const fetchData = useCallback(async () => {
        if (!token) return;

        const params = new URLSearchParams({
            startDate: filters.startDate,
            endDate: filters.endDate,
            sortBy: sortConfig.sortBy,
            sortOrder: sortConfig.sortOrder,
            priceMin: filters.priceMin || '',
            email: filters.email || '',
            phone: filters.phone || '',
            after: cursor.type === 'after' && cursor.token ? cursor.token : '',
            before: cursor.type === 'before' && cursor.token ? cursor.token : '',
        });

        const queryKey = params.toString();

        if (dataCache.current[queryKey]) {
            const cached = dataCache.current[queryKey];
            setSalesData(cached.sales);
            setChartData(cached.chart);
            setPaginationInfo(cached.pagination);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/sales?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'X-AUTOBIZZ-TOKEN': token,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `API Error: ${response.status}`);
            }

            const data = await response.json();
            const sales = data.results?.Sales || [];
            const chart = data.results?.TotalSales || [];
            const newPagination = {
                before: data.pagination?.before || data.before || null,
                after: data.pagination?.after || data.after || null
            };

            setSalesData(sales);
            setChartData(chart);
            setPaginationInfo(newPagination);

            dataCache.current[queryKey] = { sales, chart, pagination: newPagination };
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token, filters, sortConfig, cursor]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { salesData, chartData, paginationInfo, loading, error, token };
};
