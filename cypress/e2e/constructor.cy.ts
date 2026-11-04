describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('POST', 'api/auth/login', {
      fixture: 'auth.json'
    }).as('login');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Должен добавлять булку в конструктор', () => {
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.get('[data-cy="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get('[data-cy="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i'
      );

      cy.get('[data-cy="constructor-price"]').should('contain', '2510');
    });

    it('Должен добавлять начинку в конструктор', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.get('[data-cy="constructor-ingredient"]').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('Должен добавлять соус в конструктор', () => {
      cy.contains('Соус Spicy-X')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.get('[data-cy="constructor-ingredient"]').should(
        'contain',
        'Соус Spicy-X'
      );
    });

    it('Должен добавлять несколько ингредиентов в конструктор', () => {
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Соус Spicy-X')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.get('[data-cy="constructor-ingredient"]').should('have.length', 2);

      cy.get('[data-cy="constructor-price"]').should('contain', '3024');
    });

    it('Не должен создавать заказ без выбранной булки', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.get('@createOrder').should('not.exist');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('Должен открывать модальное окно при клике на ингредиент', () => {
      cy.contains('Соус Spicy-X').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]')
        .find('[data-cy="modal-title"]')
        .should('contain', 'Детали ингредиента');
    });

    it('Должен показывать правильные данные ингредиента', () => {
      cy.contains('Соус Spicy-X').click();
      cy.contains('Калории, ккал').should('be.visible');
      cy.contains('30').should('be.visible');
      cy.contains('Белки, г').should('be.visible');
      cy.contains('30').should('be.visible');
    });

    it('Должен закрывать модальное окно при клике на крестик', () => {
      cy.contains('Соус Spicy-X').click();
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Должен закрывать модальное окно при клике по оверлею', () => {
      cy.contains('Соус Spicy-X').click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа с авторизацией', () => {
    beforeEach(() => {
      cy.setAuthToken();
      cy.reload();
      cy.wait('@getIngredients');
      cy.wait('@getUser');

      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Соус Spicy-X')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();
    });

    it('Должен создавать заказ и показывать номер', () => {
      cy.get('[data-cy="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="order-modal"]').should('be.visible');
      cy.contains('103106').should('be.visible');
    });

    it('Должен закрывать модальное окно заказа', () => {
      cy.get('[data-cy="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="order-modal"]').should('not.exist');
    });

    it('Должен очищать конструктор после создания заказа', () => {
      cy.get('[data-cy="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal-close"]').click();

      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-bun"]').should('not.exist');
      cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
    });
  });

  describe('Создание заказа без авторизации', () => {
    beforeEach(() => {
      cy.clearAuthToken();
      cy.reload();
      cy.wait('@getIngredients');

      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Соус Spicy-X')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .contains('Добавить')
        .click();
    });

    it('должен перенаправить на страницу логина при попытке создать заказ без авторизации', () => {
      cy.get('[data-cy="order-button"]').click();
      cy.url().should('include', '/login');
    });
  });
});
