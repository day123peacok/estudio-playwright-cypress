# Informe Técnico: Pruebas E2E con Playwright y Cypress

## 1. Introducción y Objetivos

Este informe documenta el desarrollo y la validación de una aplicación web de lista de tareas (**To-Do List**) utilizando dos enfoques líderes en pruebas End-to-End (E2E): **Playwright** y **Cypress**. 

El objetivo principal es comparar la sintaxis, el comportamiento de ejecución, la configuración y la robustez de ambos frameworks frente a un caso de uso idéntico en una aplicación web ligera desarrollada sin frameworks ni bases de datos externas.

---

## 2. Descripción de la Aplicación Bajo Prueba

La aplicación web ubicada en el directorio `app/` consta de tres archivos principales:
- **`app/index.html`**: Página web semántica con un título principal "Lista de tareas", un campo de entrada accesible con etiqueta asociada "Nueva tarea" y `name="task"`, y un botón de envío "Agregar".
- **`app/styles.css`**: Hoja de estilos que otorga una interfaz limpia, adaptada a diferentes tamaños de pantalla y con realces visuales para estados interactivos (foco, tachado de tareas completadas).
- **`app/app.js`**: Lógica en JavaScript nativo que gestiona el DOM, previene el envío de tareas vacías (mostrando un mensaje de error accesible), permite marcar tareas como completadas, eliminarlas y persistir el estado de las tareas mediante el API del navegador `localStorage`.

---

## 3. Escenarios de Prueba Implementados

Tanto en la suite de Playwright (`tests/playwright/todo.spec.js`) como en la de Cypress (`tests/cypress/e2e/todo.cy.js`), se han implementado los siguientes 6 escenarios de prueba automatizados con aislamiento de datos (`localStorage.clear()` previo):

1. **Verificación del título**: Comprueba que la página web muestre el título correcto `"Lista de tareas"` tanto en el título del documento como en el encabezado `<h1>`.
2. **Adición de tareas**: Permite escribir texto válido en el campo de entrada, hacer clic en el botón "Agregar" y validar que la tarea aparezca visible en la lista.
3. **Validación de entradas vacías**: Comprueba que al intentar agregar una tarea sin texto, la aplicación muestre el mensaje de error correspondiente (`"La tarea no puede estar vacía."`) y no añada elementos a la lista.
4. **Marcado de tareas completadas**: Permite interactuar con la casilla de verificación de una tarea existente, comprobando que se active correctamente y que se aplique la clase de estilo visual (`completed`).
5. **Eliminación de tareas**: Comprueba la funcionalidad para eliminar una tarea específica de la lista mediante su botón correspondiente.
6. **Persistencia de datos**: Agrega una tarea, recarga la página web y verifica que la tarea continúe almacenada y visible gracias al uso de `localStorage`.

---

## 4. Comparación entre Playwright y Cypress

| Dimensión | Playwright | Cypress |
| :--- | :--- | :--- |
| **Sintaxis y Estilo** | Basado en Node.js puro, uso intensivo de `async/await` nativo. | API encadenada propia basada en promesas gestionadas internamente (`cy.get()`, `cy.click()`). |
| **Selectores** | Excelente soporte nativo para selectores orientados a accesibilidad (`getByRole`, `getByLabel`). | Selectores CSS estándar y consultas basadas en texto (`cy.contains()`, `cy.get()`). |
| **Configuración** | Configuración centralizada en `playwright.config.js` con soporte nativo para levantar servidores web automáticos (`webServer`). | Configuración centralizada en `cypress.config.js` orientada a la URL base (`baseUrl`). |
| **Ejecución Visual** | Modo UI interactivo moderno (`--ui`). | Test Runner interactivo en el navegador con vista de comandos paso a paso (`open`). |

---

## 5. Automatización del ciclo completo de pruebas

### Problema identificado

Inicialmente, Playwright y Cypress podían ejecutarse de manera independiente, pero el flujo conjunto requería coordinar el inicio y la disponibilidad del servidor local para que ambas suites pudieran ejecutarse consecutivamente.

### Solución implementada

Con la asistencia de **OpenCode**, se analizó el problema y se incorporó la dependencia `start-server-and-test` (versión `3.0.13`) para automatizar el ciclo de ejecución. En `package.json`, el script `test:all` quedó configurado de la siguiente manera:

```json
"test:all": "start-server-and-test start 4173 \"npm run test:pw && npm run test:cy\""
```

El comando realiza estas operaciones:

1. Ejecuta el script `start`, que inicia la aplicación mediante `http-server` en el puerto `4173`.
2. Espera hasta que el servidor esté disponible.
3. Ejecuta Playwright mediante `npm run test:pw`.
4. Si Playwright termina correctamente, ejecuta Cypress mediante `npm run test:cy`.
5. Al finalizar el proceso, detiene el servidor iniciado.

El operador `&&` hace que Cypress se ejecute únicamente si la suite de Playwright termina correctamente.

### Papel de OpenCode

OpenCode se utilizó como asistente de programación para analizar el problema de coordinación, proponer la herramienta adecuada e implementar los cambios necesarios en `package.json` y `package-lock.json`. La ejecución y las aserciones de las pruebas siguen siendo responsabilidad de Playwright y Cypress; OpenCode no sustituye a estos frameworks.

### Resultado

Según la ejecución realizada en el entorno local mediante `npm run test:all`, ambas suites finalizaron correctamente:

- Playwright: 6 pruebas exitosas.
- Cypress: 6 pruebas exitosas.
- **Total: 12 pruebas exitosas.**

Esta configuración evita iniciar manualmente el servidor y ejecutar cada suite por separado, haciendo que el ciclo local sea más sencillo y reproducible.

---

## 6. Resultados Observados

- Ambas suites de pruebas se ejecutaron exitosamente cubriendo los escenarios funcionales establecidos. En la ejecución conjunta mediante `npm run test:all`, Playwright completó 6 pruebas y Cypress completó otras 6, para un total de 12 pruebas exitosas.
- El aislamiento de datos implementado mediante la limpieza del `localStorage` en cada inicio de prueba garantizó la independencia de los casos de prueba, evitando falsos positivos o negativos por acumulación de estado.
- Se han capturado evidencias visuales del éxito de las pruebas en ambos entornos, almacenadas en la carpeta de evidencias del proyecto.

---

## 7. Conclusiones y Próximos Pasos

### Conclusiones
- El desarrollo con tecnologías nativas (HTML/CSS/JS) facilitó la creación de pruebas robustas sin acoplamiento a frameworks de frontend complejos.
- Tanto Playwright como Cypress demostraron ser herramientas sumamente potentes para validar la accesibilidad, la persistencia local y el comportamiento reactivo de la aplicación.

### Próximos Pasos
- [ ] Integrar las ejecuciones de pruebas E2E en un flujo de integración continua (CI/CD) mediante GitHub Actions.
- [ ] Ampliar los escenarios de prueba para cubrir casos de teclado (ej. presionar `Enter` para agregar tareas).
- [ ] Completar la revisión manual de métricas de rendimiento y tiempos de carga registrados en las ejecuciones locales.

---

## 📸 Referencias a Evidencias

A continuación se enlistan las capturas de pantalla de los resultados de ejecución almacenadas en el repositorio:
- Evidencia de resultados de Playwright: `docs/evidencias/playwright-resultados.png.png`
- Evidencia de resultados de Cypress: `docs/evidencias/cypress-resultados.png.png`
