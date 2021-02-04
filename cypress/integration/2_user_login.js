describe('User Login', () => {
    it('Tests to see if a user can login', () => {
        cy.visit('http://localhost:3000/signin').should.load
    });
    
    it('should fill login form and redirect to homepage', () => {
   
        // Fill the username
        cy.get('[data-cy="username"]')
          .type('admin')
          .should('have.value', 'admin');
        // Fill the email
          cy.get('[data-cy="email"]')
          .type('handyandy@gmail.com')
          .should('have.value', 'admin');
    
        // Fill the password
        cy.get('[data-cy="password"]')
          .type('password')
          .should('have.value', 'password');
    
        // Locate and submit the form
        cy.get('login').submit();
        
        // Verify the app redirected you to the homepage
        cy.location('pathname', { timeout: 10000 }).should('eq', '/');
        
        // Verify the page title is "Home"
        // cy.title().should('eq', '');
       
      });
  })