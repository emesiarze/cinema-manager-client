import user from '../../fixtures/user.json'
import { visitLoginPage } from "../shared/shared";
import {typeCredentialsAndSubmit} from "../shared/shared";

function selectSeanse() {
  cy.get('tbody tr').first().click()
}

function selectSeat(seatIndex) {
  cy.get('.seat').eq(seatIndex).click();
}

function shouldSeatHasClass(seatIndex, className) {
  cy.get('.seat').eq(seatIndex).should('have.class', className);
}

// function hasNotTheSeatAClass(seatIndex, className) {
//   cy.get('.seat').eq(seatIndex).should('not.have.class', className);
// }

describe('Reservation', () => {
  beforeEach(() => {
    visitLoginPage()
  })

  it(`correctly make a permanent reservation`, () => {
    typeCredentialsAndSubmit(user)

    selectSeanse()
    selectSeat(2)
    shouldSeatHasClass(2, 'reserved-by-user')
    cy.get('button').contains('Zarezerwuj').click()
    shouldSeatHasClass(2, 'reserved-permanent')
  })

  // it(`correctly make a temporary reservation`, () => {
  //   typeCredentialsAndSubmit(user)
  //
  //   selectSeanse()
  //   selectSeat(0)
  //   shouldSeatHasClass(0, 'reserved-by-user')
  // })
  //
  // it(`correctly cancel a temporary reservation`, () => {
  //   typeCredentialsAndSubmit(user)
  //
  //   selectSeanse()
  //   selectSeat(1)
  //   shouldSeatHasClass(1, 'reserved-by-user')
  //   selectSeat(1)
  //   hasNotTheSeatAClass(1, 'reserved-by-user')
  // })
  //
  // it(`be unable to reserve already reserved seat`, () => {
  //   typeCredentialsAndSubmit(user)
  //
  //   selectSeanse()
  //   selectSeat(3)
  //   shouldSeatHasClass(3, 'reserved-by-user')
  //   cy.get('button').contains('Zarezerwuj').click()
  //   shouldSeatHasClass(3, 'reserved-permanently')
  //   selectSeat(3);
  //   cy.get('app-success-snack-bar').should('not.exist')
  //   shouldSeatHasClass(3, 'reserved-permanently')
  // })
})
