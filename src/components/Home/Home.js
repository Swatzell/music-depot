import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Container, Box } from '@mui/material';

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
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Music Depot
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Where you can find anything you need to know about your favorite Musicians and Bands.
        </Typography>
      </Box>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Artist
        </Typography>
        {artist && (
          <Card sx={{ maxWidth: 600, mx: 'auto' }}>
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
      </Box>
    </Container>
  );
}

export default Home;