describe('restricted to login', () => {
    it('fails', () => {
      // all of these routes should fail when visited as they are restricted to logged-in users
      cy.visit('localhost:3001/verified_users')
      cy.visit('localhost:3001/add_book')
      cy.visit('localhost:3001/orders')
      cy.visit('localhost:3001/employee_page')
    })
  })