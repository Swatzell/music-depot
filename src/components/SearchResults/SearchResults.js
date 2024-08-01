import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, TextField, Button, Container, Grid, Box, Alert } from '@mui/material';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const urlQuery = useQuery();

  useEffect(() => {
    const savedQuery = urlQuery.get('query');
    if (savedQuery) {
      setQuery(savedQuery);
      fetchResults(savedQuery);
    }
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchResults(query);
    navigate(`?query=${query}`);
  };

  const fetchResults = async (query) => {
    const token = 'kqgYPvozoTdGUTWqjCHfEUpjCUuQOuBsJIzNiIoH';
    const url = `https://api.discogs.com/database/search?q=${query}&type=artist&token=${token}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.results);
      setError(''); // Clear any previous errors
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    }
  };

  const handleResultClick = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search for a Band or Musician
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="Artist Name"
            variant="outlined"
            value={query}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>
      </Box>
      {error && (
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Results:
        </Typography>
        <Grid container spacing={3}>
          {results.map((result, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card onClick={() => handleResultClick(result.id)}>
                <CardActionArea>
                  {result.cover_image && (
                    <CardMedia
                      component="img"
                      height="200"
                      // Line 95 : image = {result.cover_image ? result.cover_image : '/src/asset/animage of your choice}
                      image={result.cover_image}
                      alt={result.title}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {result.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default SearchPage;