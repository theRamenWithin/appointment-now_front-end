describe('Site Loads', () => {
    it('Tests to see if the website loads', () => {
        // Basic Test to see if website Loads
        cy.visit('http://localhost:3000/').should.load
    })
  })
  
  
  
  
  
  // Test setup to have three phases:
  
  // Arrange - setup initial app state
  
  // Act - take an action
  
  // Assert - make an assertion
  