const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Limpiar localStorage antes de cada prueba para aislar los datos
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('muestra el título "Lista de tareas"', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Lista de tareas');
  const heading = page.getByRole('heading', { name: 'Lista de tareas' });
  await expect(heading).toBeVisible();
});

test('permite agregar una tarea', async ({ page }) => {
  await page.goto('/');
  
  const taskInput = page.getByLabel('Nueva tarea');
  const addButton = page.getByRole('button', { name: 'Agregar' });

  await taskInput.fill('Comprar leche');
  await addButton.click();

  const taskItem = page.getByText('Comprar leche');
  await expect(taskItem).toBeVisible();
});

test('no permite agregar tareas vacías', async ({ page }) => {
  await page.goto('/');
  
  const addButton = page.getByRole('button', { name: 'Agregar' });
  await addButton.click();

  const errorMsg = page.getByText('La tarea no puede estar vacía.');
  await expect(errorMsg).toBeVisible();

  // Comprobar que no se añadió ninguna tarea a la lista
  const listItems = page.locator('.task-item');
  await expect(listItems).toHaveCount(0);
});

test('permite marcar una tarea como completada', async ({ page }) => {
  await page.goto('/');
  
  const taskInput = page.getByLabel('Nueva tarea');
  const addButton = page.getByRole('button', { name: 'Agregar' });

  await taskInput.fill('Estudiar Playwright');
  await addButton.click();

  const checkbox = page.getByRole('checkbox', { name: /Estudiar Playwright/i });
  await checkbox.check();

  await expect(checkbox).toBeChecked();
  const taskItem = page.locator('.task-item');
  await expect(taskItem).toHaveClass(/completed/);
});

test('permite eliminar una tarea', async ({ page }) => {
  await page.goto('/');
  
  const taskInput = page.getByLabel('Nueva tarea');
  const addButton = page.getByRole('button', { name: 'Agregar' });

  await taskInput.fill('Tarea temporal');
  await addButton.click();

  const taskItem = page.getByText('Tarea temporal');
  await expect(taskItem).toBeVisible();

  const deleteButton = page.getByRole('button', { name: /Eliminar tarea "Tarea temporal"/i });
  await deleteButton.click();

  await expect(taskItem).not.toBeVisible();
});

test('las tareas persisten después de recargar la página', async ({ page }) => {
  await page.goto('/');
  
  const taskInput = page.getByLabel('Nueva tarea');
  const addButton = page.getByRole('button', { name: 'Agregar' });

  await taskInput.fill('Tarea persistente');
  await addButton.click();

  await expect(page.getByText('Tarea persistente')).toBeVisible();

  // Recargar la página
  await page.reload();

  await expect(page.getByText('Tarea persistente')).toBeVisible();
});
