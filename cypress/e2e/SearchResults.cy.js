describe('Search Page Happy Path', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/database/search**', {
      fixture: 'searchResults.json'
    }).as('searchRequest');
  });

  it('should display search results when a query is entered and search is performed', () => {
    cy.visit('http://localhost:3000/search'); 

   
    cy.get('input').type('Nirvana');
    cy.get('button').contains('Search').click();

    
    cy.wait('@searchRequest');

  
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