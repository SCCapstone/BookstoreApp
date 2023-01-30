describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3001/login')

    cy.get('input[type="text"]').type('trial@error.com')
    cy.get('input[type="password"]').type('trial{enter}')
  })
})