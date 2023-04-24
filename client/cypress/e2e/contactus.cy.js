describe('template spec', () => {
    it('passes', () => {
      cy.visit('localhost:3001/contact')
  
      cy.get('input[name="from_name"]').type('Billy Bob')
      cy.get('input[name="from_email"]').type('email')
    })
  })