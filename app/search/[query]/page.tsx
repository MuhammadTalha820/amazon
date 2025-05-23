'use client'

import SearchResult from '@/components/SearchResult'
import { useSupabase } from '@/lib/supabase/hooks/useSupabase'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const SearchPage = () => {
    const params = useParams();
    const query = params?.query;

    const { filterData, getFilteredData } = useSupabase()

    useEffect(() => {
        if (query) {
            getFilteredData(query.toString());
        }
    }, [query, getFilteredData]) // ✅ added getFilteredData to deps

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4 text-center">Search Results for: {query}</h1>
            <SearchResult filterData={filterData} />
        </div>
    )
}

export default SearchPage
