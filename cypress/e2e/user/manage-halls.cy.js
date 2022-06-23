import user from '../../fixtures/user-admin.json'
import hall from '../../fixtures/hall.json'
import {navigateTo, visitLoginPage} from "../shared/shared";
import {typeCredentialsAndSubmit} from "../shared/shared";

function typeHallDataAndSubmit(hall) {
  cy.get('mat-dialog-container input').eq(0).type(hall.number)
  cy.get('button[type=submit]').click()
}

function editHallAndSubmit() {
  cy.get('mat-dialog-container input').eq(0).type(' edit')
  cy.get('button[type=submit]').click()
}

describe('Manage halls', () => {
  beforeEach(() => {
    visitLoginPage()
    typeCredentialsAndSubmit(user)
    navigateTo('Zarządzaj salami')
  })

  it(`correctly add a hall`, () => {
    cy.get('button').contains('Dodaj').first().click()
    typeHallDataAndSubmit(hall)
    cy.get('app-success-snack-bar').contains('Dodano element')
    cy.get('tbody tr.mat-row').should('have.length', 5)
  })

  it(`correctly edit a hall`, () => {
    cy.get('tbody tr.mat-row').last().contains('edit').click()
    editHallAndSubmit();
    cy.get('app-success-snack-bar').contains('Zaktualizowano element')
  })

  it(`correctly removes a hall`, () => {
    cy.get('tbody tr.mat-row').last().contains('delete').click()
    cy.get('app-success-snack-bar').contains('Usunieto element')
    cy.get('tbody tr.mat-row').should('have.length', 4)
  })
})
