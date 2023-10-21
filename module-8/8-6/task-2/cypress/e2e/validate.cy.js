describe('Тестируем кредитную карту', () => {
  it('Ввод корректных данных', () => {
    cy.visit('http://localhost:1234/');
    cy.get('.input__holder').type('Ivan Pronin');
    cy.get('.input__number').type('0000111122223333');
    cy.get('.input__date').type('1122');
    cy.get('.input__cvv').type('789');
    cy.get('.form__button').click();
    cy.get('h2').should('contain.text', 'Данные корректны');
  });

  it('Ввод не корректных данных', () => {
    cy.visit('http://localhost:1234/');
    cy.get('.input__holder').type('I.Pronin');
    cy.get('.input__number').type('111222333');
    cy.get('.input__date').type('112');
    cy.get('.input__cvv').type('78,');
    cy.get('.form__button').click();
    cy.get('h2').should('contain.text', 'Данные не корректны');
  });
});
