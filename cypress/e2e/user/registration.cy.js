import user from '../../fixtures/user-registration.json'
import {typeCredentialsAndSubmit, visitLoginPage} from "../shared/shared";

const now = Date.now().toString();
// Make user login unique
user.login = user.login += now

function openRegistrationDialog() {
  cy.get('button').contains('Zarejestruj').click()
}

function typeRegistrationDataAndSubmit(user) {
  cy.get('mat-dialog-container input').eq(0).type(user.login)
  cy.get('mat-dialog-container input').eq(1).type(user.fullName)
  cy.get('mat-dialog-container input[type=password]').type(user.password)
  cy.get('mat-dialog-container button[type=submit]').click()
}

describe('Registration', () => {
  beforeEach(() => {
    visitLoginPage()
  })

  it(`correctly communicate successful user registration`, () => {
    openRegistrationDialog();
    typeRegistrationDataAndSubmit(user)

    // Check if the success message appears
    cy.get('app-success-snack-bar').contains('Dodano element')
  })

  it(`correctly logs just registered user in`, () => {
    typeCredentialsAndSubmit(user)

    // Check if the url is correct
    cy.url().should('equal', 'http://localhost:4200/seanse-selection')
  })
})
