# Seminari-Angular: Gestión de Organizaciones y Usuarios

Este es un proyecto del frontend en Angular que se conecta a una API REST para administrar Organizaciones y sus respectivos Usuarios.

## Funcionalidades Implementadas (Tareas)
1. **Actualización de Modelos**: Adaptación de la interfaz `Organizacion` para soportar objetos anidados `Usuario`.
2. **Control Flow Moderno**: Sustitución de directivas estructurales (`*ngIf`, `*ngFor`) por el nuevo sistema de Angular (`@if`, `@for`) en el componente de listado de organizaciones.
3. **Gestor de Sincronización**: Creación del componente dedicado (`app-org-users-manager`) para añadir de forma dinámica (relacionar en base de datos) o eliminar a usuarios ya pertenecientes a las empresas seleccionadas.

---

## Uso de Inteligencia Artificial (IA)
En el desarrollo de este ejercicio, se ha contado con la asistencia de Inteligencia Artificial como herramienta de apoyo ya que había muchos errores que no sabía solucionar, concretamente reflejado en los comentarios del código:

* **Componente y Vista HTML (`organizacion-list.html`)**: La gran mayoría de este archivo HTML se ha creado y arreglado utilizando la ayuda de la IA para solventar problemas técnicos que había con los botones, y para estructurar correctamente la interacción del nuevo *Control Flow* (`@for` / `@if`) con el menú desplegable.
* **Componente Gestor (`org-users-manager.ts`)**:
  * Funciones específicas de lógica compleja como el filtro `availableUsers` para descartar a los trabajadores que ya existían en la empresa (uso de IA).
  * La suscripción a la red en la variable `orgUsersResult` que descarga los usuarios *populados*.
  * diseño de los botones hecho con ayuda de ia 

