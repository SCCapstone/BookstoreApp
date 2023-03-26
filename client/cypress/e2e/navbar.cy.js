//one of our tests using cypress for the login 
describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3001/login') //starts the app and goes to the login

    cy.get('input[type="text"]').type('trial@error.com') //username for the login
    cy.get('input[type="password"]').type('trial{enter}') //password for the login
  })
})