# Estudio y Pruebas E2E con Playwright y Cypress

Proyecto didáctico diseñado para practicar y comparar pruebas End-to-End (E2E) utilizando los frameworks **Playwright** y **Cypress** sobre una aplicación web To-Do moderna y accesible construida con tecnologías nativas.

---

## 🎯 Objetivo y Descripción del Proyecto

El objetivo principal de este proyecto es implementar una aplicación web sencilla de gestión de tareas (To-Do List) y automatizar su validación funcional mediante dos de los frameworks de pruebas E2E más populares del mercado actual: **Playwright** y **Cypress**.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5 semántico, CSS3 (diseño responsivo y moderno) y JavaScript (ES6+ nativo, con soporte para `localStorage`).
- **Frameworks de Pruebas E2E**:
  - [Playwright Test](https://playwright.dev/) (`^1.64.1`)
  - [Cypress](https://www.cypress.io/) (`^16.2.0`)
- **Herramientas auxiliares**: `http-server` para servir la aplicación estática localmente.

---

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- Gestor de paquetes `npm` (incluido con Node.js).

---

## ⚙️ Instalación y Configuración

1. **Clonar o abrir el repositorio** en tu entorno local.
2. **Instalar las dependencias** del proyecto:
   ```cmd
   npm install
   ```

---

## 🚀 Ejecución de la Aplicación

Para levantar un servidor local que sirva la aplicación To-Do en el puerto `4173`:

```cmd
npx http-server app -p 4173
```

Una vez iniciado, abre tu navegador y accede a `http://127.0.0.1:4173`.

---

## 🧪 Ejecución de Pruebas E2E

### Con Playwright
- **Modo headless (consola)**:
  ```cmd
  npx playwright test
  ```
- **Modo interfaz visual interactiva (UI)**:
  ```cmd
  npx playwright test --ui
  ```

### Con Cypress
- **Modo headless (consola)**:
  ```cmd
  node ./node_modules/cypress/bin/cypress run --config baseUrl=http://127.0.0.1:4173 --headless
  ```
- **Modo interactivo (Test Runner)**:
  ```cmd
  node ./node_modules/cypress/bin/cypress open
  ```

---

## 📁 Estructura del Proyecto

```text
estudio-playwright-cypress/
├── app/
│   ├── index.html       # Estructura semántica de la aplicación To-Do
│   ├── styles.css       # Estilos CSS modernos y responsivos
│   └── app.js           # Lógica de la aplicación y gestión de localStorage
├── tests/
│   ├── playwright/
│   │   └── todo.spec.js # Pruebas E2E con Playwright
│   └── cypress/
│       └── e2e/
│           └── todo.cy.js # Pruebas E2E equivalentes con Cypress
├── docs/
│   └── evidencias/      # Capturas de pantalla e informes visuales
│       ├── playwright-resultados.png.png
│       └── cypress-resultados.png.png
├── package.json         # Dependencias y metadatos del proyecto
├── playwright.config.js # Configuración de Playwright
├── cypress.config.js    # Configuración de Cypress
└── README.md            # Documentación principal del proyecto
```

---

## 📌 Estado Actual del Proyecto

- **Aplicación To-Do**: Completada y funcional con persistencia en `localStorage` y validación de entradas vacías.
- **Pruebas Automatizadas**: Suites de pruebas implementadas de forma equivalente para Playwright y Cypress cubriendo título, adición de tareas, manejo de vacíos, marcado como completado, eliminación y persistencia tras recarga.
- **Documentación y Evidencias**: Capturas de resultados guardadas en `docs/evidencias/` y documentación técnica estructurada en `docs/informe.md`.
