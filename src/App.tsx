import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResearcherTable from './components/ResearcherTable';
import { searchResearchers } from './services/api';
import { Researcher } from './types/researcher';

function App() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await searchResearchers(keyword);
      setResearchers(response.researchers);
      setLastQuery(response.query);
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索に失敗しました');
      setResearchers([]);
      setLastQuery('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchForm onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}
        
        <ResearcherTable researchers={researchers} query={lastQuery} />
      </div>
    </div>
  );
}

export default App;