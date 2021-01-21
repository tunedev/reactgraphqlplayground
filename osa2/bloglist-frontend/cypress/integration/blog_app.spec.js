describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'testUser',
      password: 'somePassword',
      name: 'test user',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });
  it('Ensures front end can be opened', function () {
    cy.contains('blogs');
  });

  it('returns appopriate error for wrong login credentials', function () {
    cy.contains('Login').click();
    cy.get('input#username').type('testUser');
    cy.get('input#password').type('wrongPass');
    cy.get('#login-btn').click();

    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
    cy.get('html').should('not.contain', 'Logged in as test user');
  });

  it('Tries to login', function () {
    cy.contains('Login').click();
    cy.get('input#username').type('testUser');
    cy.get('input#password').type('somePassword');
    cy.get('#login-btn').click();

    cy.contains('Logged in as test user');
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'testUser',
        password: 'somePassword',
      });
      cy.createNewBlog({
        title: 'Test Blog',
        author: 'cypress',
        url: 'cypress.com',
      });
    });
    it('should create a new blog', function () {
      cy.contains('Add new Blog').click();
      cy.get('input#title').type('Cypress test in action');
      cy.get('input#author').type('cypress');
      cy.get('input#url').type('cypress.com');
      cy.get('#create-new-blog').click();

      cy.contains('Cypress test in action');
    });

    it('should increaselike on a blog', function () {
      cy.contains('Test Blog')
        .contains('Show')
        .click()
        .get('.like')
        .click()
        .click();
    });
  });
});
