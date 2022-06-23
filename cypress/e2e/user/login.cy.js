import user from '../../fixtures/user.json'
import userFalsy from '../../fixtures/user-falsy.json'
import {typeCredentialsAndSubmit, visitLoginPage} from "../shared/shared";

describe('Login page', () => {
  beforeEach(() => {
    visitLoginPage()
  })

  it(`correctly logs user in`, () => {
    typeCredentialsAndSubmit(user)

    // Check if the url is correct
    cy.url().should('equal', 'http://localhost:4200/seanse-selection')
  })

  it(`does not log user with incorrect login or password in`, () => {
    typeCredentialsAndSubmit(userFalsy)

    // Check if the url does not change
    cy.url().should('equal', 'http://localhost:4200/login')
    // Check if the error message appears
    cy.get('app-error-snack-bar').contains('Błedny login lub hasło')
  })

  it(`does not log user with empty login in`, () => {
    cy.get('button').contains('Zaloguj').parent().should('be.disabled')
  })
})
