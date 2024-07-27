import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext';

function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((artist, index) => (
          <li key={index}>
            <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;