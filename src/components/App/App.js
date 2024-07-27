import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import Home from '../Home/Home';
import SearchPage from '../SearchResults/SearchResults';
import Favorites from '../Favorites/Favorites';
import ArtistDetails from '../ArtistPage/ArtistPage';
import { FavoritesProvider } from '../../contexts/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/artist/:artistId" element={<ArtistDetails />} />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;