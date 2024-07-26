import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Home from '../Home/Home';
import SearchPage from '../SearchResults/SearchResults';
import Favorites from '../Favorites/Favorites';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;