describe('User Login', () => {
    it('Tests to see if a user can sign up and create an orginization', () => {
        cy.visit('http://localhost:3000/signup').should.load
    });
    
    it('should fill in the following details', () => {
   
        // Fill the username
        cy.get('#username')
          .type('cypresstest')
          .should('have.value', 'cypresstest');
        // Fill the email
          cy.get('#email')
          .type('cypresstest@gmail.com')
          .should('have.value', 'cypresstest@gmail.com');
    
        // Fill the password
        cy.get('#password')
          .type('password')
        //   .should('have.value');

        // Confirm the password
        cy.get('#confpassword')
          .type('password')
        //   .should('have.value', 'password');
    
        // Locate and submit the form
        cy.get('#submit').click()
        
        // Verify the app redirected you to the homepage
        cy.location('pathname', { timeout: 10000 }).should('eq', '/');
        
        // Verify the page title is "Home"
        // cy.title().should('eq', '');
       
      });
  })