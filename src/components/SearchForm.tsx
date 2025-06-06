import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (keyword: string) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">研究者推薦システム</h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="研究キーワードを入力してください（例：機械学習、自然言語処理）"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '検索中...' : '検索'}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;