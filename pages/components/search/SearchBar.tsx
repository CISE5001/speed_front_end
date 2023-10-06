// SearchBar.tsx
import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (data: any) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles`);
      if (response.ok) {
        const data = await response.json();
        onSearch(data.topics.filter((topic: { articleTitle: string; }) => topic.articleTitle.includes(query)));
      } else {
        console.error('Error searching:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex border border-gray-300 rounded p-2">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="flex-grow px-2 py-1 rounded-l focus:outline-none focus:border-blue-400"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Search
      </button>
    </div>
  );
}

export default SearchBar;