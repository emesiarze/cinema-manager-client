export function visitLoginPage() {
  cy.visit('localhost:4200/login')
}

export function typeCredentials(user) {
  cy.get('input').first().type(user.login)
  cy.get('input[type=password]').type(user.password)
}

export function typeCredentialsAndSubmit(user) {
  typeCredentials(user)
  cy.get('button').contains('Zaloguj').click()
}

export function navigateTo(actionName) {
  cy.get('nav button').contains('Akcje pracownika').click()
  cy.get('.mat-menu-panel a').contains(actionName).click()
}
