describe('Home Page happy path', () => {
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

describe('Home Page Sad Path', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/artists/**', { statusCode: 500 }).as('getFeaturedArtistError');
    cy.visit('http://localhost:3000/');
  });

  it('should handle API failure', () => {
    cy.wait('@getFeaturedArtistError');
    cy.contains('Welcome to Music Depot');
    cy.contains('Featured Artist');

    cy.get('div.MuiCard-root').should('not.exist');
    cy.contains('Error loading featured artist').should('exist');
  });
});