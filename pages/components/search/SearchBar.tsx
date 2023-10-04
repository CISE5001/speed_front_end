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
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;