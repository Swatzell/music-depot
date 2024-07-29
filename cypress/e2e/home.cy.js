describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/artists/**', { fixture: 'artist.json' }).as('getFeaturedArtist');
    cy.visit('http://localhost:3000/');
  });

  it('should display welcome message and featured artist', () => {
    cy.wait('@getFeaturedArtist');
    cy.contains('Welcome to Music Depot');
    cy.contains('Featured Artist');

    cy.get('div.MuiCard-root').should('exist');
  });
});