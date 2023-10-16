import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (data: any) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');
  const keywords = ["Agile", "Scrum", "DevOps", "CI/CD"];

  const handleSearch = async (searchQuery?: string) => {
    const searchTerm = searchQuery || query;

    try {
      const response = await fetch(`https://speed-back-end-git-feature-working-cise5001.vercel.app/api/articles`);
      if (response.ok) {
        const data = await response.json();

        if (searchQuery === "all") {  // If "Show All" button was pressed
          onSearch(data.topics);
        } else {
          onSearch(data.topics.filter((topic: { articlePractice: string | undefined | null; }) => 
            topic.articlePractice && topic.articlePractice.includes(searchTerm)
          ));
        }
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
      <button onClick={() => handleSearch()} className="bg-blue-500 text-white px-4 py-1 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Search
      </button>
      {/*<button 
        onClick={() => handleSearch("")} 
        className="bg-blue-500 text-white px-4 py-1 rounded ml-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
        Show All
  </button>*/}
      {keywords.map((keyword) => (
        <button 
          key={keyword} 
          onClick={() => handleSearch(keyword)} 
          className="bg-blue-500 text-white px-4 py-1 rounded ml-2 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400">
          {keyword}
        </button>
      ))}
      
    </div>
  );
}

export default SearchBar;
