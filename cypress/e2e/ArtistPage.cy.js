describe('Artist Page Happy Path', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/artists/12345**', {
      fixture: 'artist.json'
    }).as('artistRequest');
  });

  it('should display artist details correctly', () => {
    cy.visit('http://localhost:3000/artist/12345');


    cy.wait('@artistRequest');

  
    cy.get('img').should('have.attr', 'src', 'https://example.com/nirvana.jpg');
    cy.contains('Nirvana').should('be.visible');
    cy.contains('Nirvana was an American rock band...').should('be.visible');
    cy.contains('Real Name: Nirvana Band').should('be.visible');
    cy.contains('Kurt Cobain').should('be.visible');
    cy.contains('Krist Novoselic').should('be.visible');
    cy.contains('Dave Grohl').should('be.visible');
    cy.contains('https://nirvana.com').should('have.attr', 'href', 'https://nirvana.com');
    cy.contains('https://wikipedia.org/wiki/Nirvana_(band)').should('have.attr', 'href', 'https://wikipedia.org/wiki/Nirvana_(band)');
  });
});