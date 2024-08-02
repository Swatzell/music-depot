import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { Container, Box, Typography, Button, Card, CardContent, CardMedia, Alert } from '@mui/material';

function ArtistDetails() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState('');
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
        setError(''); 
      } catch (error) {
        setError('Error fetching artist details');
        console.error('Error fetching artist details:', error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(artistId);
    } else {
      addFavorite({
        id: artistId,
        name: artist.name,
        image: artist.images ? artist.images[0].uri : null,
      });
    }
  };

  const cleanProfileText = (text) => {
    const linkRegex = /\[(.*?)=(.*?)\]/g;
    return text.replace(linkRegex, (match, p1, p2) => p2);
  };

  return (
    <Container>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : artist ? (
        <Box sx={{ my: 4 }}>
          <Card>
            <CardMedia
              component="img"
              height="1000"
              image={artist.images[0].uri}
              alt={artist.name}
            />
            <CardContent>
              <Typography variant="h3" component="h1" gutterBottom>
                {artist.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {cleanProfileText(artist.profile)}
              </Typography>
              <Button variant="contained" color={isFavorited ? 'secondary' : 'primary'} onClick={handleFavoriteClick}>
                {isFavorited ? 'Unfavorite' : 'Favorite'}
              </Button>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" component="p">
                  <strong>Real Name:</strong> {artist.realname}
                </Typography>
                <Typography variant="h6" component="p">
                  <strong>Members:</strong> {artist.members ? artist.members.map(member => (
                    <Box component="span" key={member.id} sx={{ display: 'block' }}>
                      <Link to={`/artist/${member.id}`}>{member.name}</Link>
                    </Box>
                  )) : 'N/A'}
                </Typography>
                <Typography variant="h6" component="p">
                  <strong>URLs:</strong> {artist.urls ? artist.urls.map(url => (
                    <Box component="span" key={url} sx={{ display: 'block' }}>
                      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                    </Box>
                  )) : 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Typography variant="h5" component="p">
          Loading...
        </Typography>
      )}
    </Container>
  );
}

export default ArtistDetails;