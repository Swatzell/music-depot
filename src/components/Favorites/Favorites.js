import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { Container, Box, Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import defaultImage from '../../assets/karim-boubker-inCiuLNuwdw-unsplash.jpg';

function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleResultClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Favorites
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        {favorites.length === 0 ? (
          <Typography variant="h6" component="p" textAlign="center">
            No favorites yet
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((artist, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card onClick={() => handleResultClick(artist.id)}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      src={artist.image || defaultImage} 
                      alt={artist.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {artist.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Favorites;