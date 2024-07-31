describe('Favorites Page Happy Path', () => {
  beforeEach(() => {
    cy.fixture('searchResults.json').then((data) => {
      const favorites = data.results.map(artist => ({
        id: artist.id,
        name: artist.title,
        image: artist.cover_image
      }));

    
      cy.setFavorites(favorites);
    });

    cy.visit('http://localhost:3000/favorites'); 
  });

  it('should display favorite artists', () => {
    cy.get('.MuiCard-root', { timeout: 10000 }).should('have.length', 2);

   
    cy.get('.MuiCard-root').first().within(() => {
      cy.get('img').should('have.attr', 'src', 'https://example.com/nirvana.jpg');
      cy.get('.MuiTypography-root').contains('Nirvana');
    });

   
    cy.get('.MuiCard-root').last().within(() => {
      cy.get('img').should('have.attr', 'src', 'https://example.com/pearljam.jpg');
      cy.get('.MuiTypography-root').contains('Pearl Jam');
    });
  });
});