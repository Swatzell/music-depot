import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = 'kqgYPvozoTdGUTWqjCHfEUpjCUuQOuBsJIzNiIoH';
    const url = `https://api.discogs.com/database/search?q=${query}&type=artist&token=${token}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.results); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleResultClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <div>
      <h1>Discogs Artist Search</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label>Artist Name: </label>
          <input type="text" value={query} onChange={handleInputChange} />
        </div>
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Results:</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index} onClick={() => handleResultClick(result.id)}>
              {result.title} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchPage;