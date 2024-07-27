import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import './ArtistPage.css';

function ArtistDetails() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const isFavorited = favorites.some(favorite => favorite.id === artistId);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const token = 'kqgYPvozoTdGUTWqjCHfEUpjCUuQOuBsJIzNiIoH';
      const url = `https://api.discogs.com/artists/${artistId}?token=${token}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };


    fetchArtistDetails();
  }, [artistId]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(artistId);
    } else {
      addFavorite({ id: artistId, name: artist.name });
    }
  };

  return (
    <div className="artist-details">
      {artist ? (
        <div>
          <h1>{artist.name}</h1>
          <img src={artist.images[0].uri} alt={artist.name} />
          <p>{artist.profile}</p>
          <button onClick={handleFavoriteClick}>
            {isFavorited ? 'Unfavorite' : 'Favorite'}
          </button>
          <div className="artist-info">
            <p><strong>Real Name:</strong> {artist.realname}</p>
            <p><strong>Members:</strong> {artist.members ? artist.members.map(member => member.name).join(', ') : 'N/A'}</p>
            <p><strong>URLs:</strong> {artist.urls ? artist.urls.map(url => <a href={url} key={url} target="_blank" rel="noopener noreferrer">{url}</a>) : 'N/A'}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ArtistDetails;