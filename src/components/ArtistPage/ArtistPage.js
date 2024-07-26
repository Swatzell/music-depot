import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ArtistDetails() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

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

  return (
    <div>
      {artist ? (
        <div>
          <h1>{artist.name}</h1>
          <p>{artist.profile}</p>
          {/* Display other artist details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ArtistDetails;