import user from '../../fixtures/user-admin.json'
import movie from '../../fixtures/movie.json'
import {navigateTo, visitLoginPage} from "../shared/shared";
import {typeCredentialsAndSubmit} from "../shared/shared";

function typeMovieDataAndSubmit(movie) {
  cy.get('mat-dialog-container input').eq(0).type(movie.title)
  cy.get('mat-dialog-container input').eq(1).type(movie.director)
  cy.get('mat-dialog-container input').eq(2).type(movie.duration)
  cy.get('button[type=submit]').click()
}

function editMovieAndSubmit() {
  cy.get('mat-dialog-container input').eq(0).type(' edit')
  cy.get('mat-dialog-container input').eq(1).type(' edit')
  cy.get('mat-dialog-container input').eq(2).type(' edit')
  cy.get('button[type=submit]').click()
}

describe('Manage movies', () => {
  beforeEach(() => {
    visitLoginPage()
    typeCredentialsAndSubmit(user)
    navigateTo('Zarządzaj filmami')
  })

  it(`correctly add a movie`, () => {
    cy.get('button').contains('Dodaj').first().click()
    typeMovieDataAndSubmit(movie)
    cy.get('app-success-snack-bar').contains('Dodano element')
    cy.get('tbody tr.mat-row').should('have.length', 5)
  })

  it(`correctly edit a movie`, () => {
    cy.get('tbody tr.mat-row').last().contains('edit').click()
    editMovieAndSubmit();
    cy.get('app-success-snack-bar').contains('Zaktualizowano element')
  })

  it(`correctly removes a movie`, () => {
    cy.get('tbody tr.mat-row').last().contains('delete').click()
    cy.get('app-success-snack-bar').contains('Usunieto element')
    cy.get('tbody tr.mat-row').should('have.length', 4)
  })
})
