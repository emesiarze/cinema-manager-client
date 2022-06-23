import user from '../../fixtures/user-admin.json'
import {navigateTo, visitLoginPage} from "../shared/shared";
import {typeCredentialsAndSubmit} from "../shared/shared";

function typeSeanseDataAndSubmit() {
  cy.get('mat-dialog-container input').eq(0).click()
  cy.get('mat-option').eq(0).click()
  cy.get('mat-dialog-container input').eq(1).click()
  cy.get('mat-option').eq(0).click()
  cy.get('button[type=submit]').click()
}

function editSeanseAndSubmit() {
  cy.get('mat-dialog-container input').eq(0).click()
  cy.get('mat-option').eq(1).click()
  cy.get('mat-dialog-container input').eq(1).click()
  cy.get('mat-option').eq(1).click()
  cy.get('button[type=submit]').click()
}

describe('Manage seanses', () => {
  beforeEach(() => {
    visitLoginPage()
    typeCredentialsAndSubmit(user)
    navigateTo('Zarządzaj seansami')
  })

  it(`correctly add a seanse`, () => {
    cy.get('button').contains('Dodaj').first().click()
    typeSeanseDataAndSubmit()
    cy.get('app-success-snack-bar').contains('Dodano element')
    cy.get('tbody tr.mat-row').should('have.length', 4)
  })

  it(`correctly edit a seanse`, () => {
    cy.get('tbody tr.mat-row').last().contains('edit').click()
    editSeanseAndSubmit();
    cy.get('app-success-snack-bar').contains('Zaktualizowano element')
  })


  it(`correctly removes a seanse`, () => {
    cy.get('tbody tr.mat-row').last().contains('delete').click()
    cy.get('app-success-snack-bar').contains('Usunieto element')
    cy.get('tbody tr.mat-row').should('have.length', 4)
  })
})
