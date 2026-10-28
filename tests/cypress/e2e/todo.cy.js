describe('Lista de tareas - E2E con Cypress', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.reload();
  });

  it('muestra el título "Lista de tareas"', () => {
    cy.title().should('eq', 'Lista de tareas');
    cy.get('h1').should('contain.text', 'Lista de tareas');
  });

  it('permite agregar una tarea', () => {
    cy.get('input[name="task"]').type('Comprar leche');
    cy.get('button').contains('Agregar').click();

    cy.contains('.task-item', 'Comprar leche').should('be.visible');
  });

  it('no permite agregar tareas vacías', () => {
    cy.get('button').contains('Agregar').click();

    cy.get('#error-msg').should('be.visible').and('contain.text', 'La tarea no puede estar vacía.');
    cy.get('.task-item').should('have.length', 0);
  });

  it('permite marcar una tarea como completada', () => {
    cy.get('input[name="task"]').type('Estudiar Cypress');
    cy.get('button').contains('Agregar').click();

    cy.contains('.task-item', 'Estudiar Cypress').find('input[type="checkbox"]').check();
    cy.contains('.task-item', 'Estudiar Cypress').should('have.class', 'completed');
    cy.contains('.task-item', 'Estudiar Cypress').find('input[type="checkbox"]').should('be.checked');
  });

  it('permite eliminar una tarea', () => {
    cy.get('input[name="task"]').type('Tarea temporal');
    cy.get('button').contains('Agregar').click();

    cy.contains('.task-item', 'Tarea temporal').should('be.visible');
    cy.contains('.task-item', 'Tarea temporal').find('.delete-btn').click();

    cy.contains('.task-item', 'Tarea temporal').should('not.exist');
  });

  it('las tareas persisten después de recargar la página', () => {
    cy.get('input[name="task"]').type('Tarea persistente');
    cy.get('button').contains('Agregar').click();

    cy.contains('.task-item', 'Tarea persistente').should('be.visible');

    cy.reload();

    cy.contains('.task-item', 'Tarea persistente').should('be.visible');
  });
});
