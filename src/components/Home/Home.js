import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const artistIds = [125246, 605148, 17199];

function Home() {
  const [artist, setArtist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomArtist = async () => {
      const token = 'kqgYPvozoTdGUTWqjCHfEUpjCUuQOuBsJIzNiIoH';
      const randomArtistId = artistIds[Math.floor(Math.random() * artistIds.length)];
      const url = `https://api.discogs.com/artists/${randomArtistId}?token=${token}`;

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

    fetchRandomArtist();
  }, []);

  const handleCardClick = () => {
    navigate(`/artist/${artist.id}`);
  };

  return (
    <div>
      <h1>Music Depot</h1>
      {artist && (
        <Card>
          <CardActionArea onClick={handleCardClick}>
            <CardMedia
              component="img"
              height="500"
              image={artist.images[0].uri}
              alt={artist.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {artist.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default Home;