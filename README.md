# crm-vue

Este proyecto utiliza Vue 3 en combinación con Vite como entorno de desarrollo. A continuación, se detallan las instrucciones para configurarlo y las recomendaciones para trabajar colaborativamente en este repositorio.

## Requisitos Recomendados

- **IDE**: [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
  - Extensión: [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desactivar Vetur si está instalado).

## Configuración Inicial del Proyecto

1. **Clonar el repositorio**:
   ```sh
   git clone https://github.com/CristobalHenriquez/CenArb_Web.git
   ```
2. **Moverse al directorio del proyecto**:
   ```sh
   cd CenArb_Web
   ```
3. **Instalar dependencias**:
   ```sh
   npm install
   ```

## Scripts Disponibles

### Compilar y Recargar en Desarrollo

```sh
npm run dev
```

### Compilar y Minificar para Producción

```sh
npm run build
```

## Uso del Repositorio: Guía para Desarrolladores

### Rama Principal y Ramas de Trabajo
- **Rama principal (`main`)**: Esta rama contiene el código estable listo para producción. No realices cambios directamente en esta rama a menos que sea estrictamente necesario.
- **Rama compartida (`develop`)**: Usaremos esta rama para el desarrollo colaborativo.

### Flujo de Trabajo

#### 1. Crear y Configurar la Rama `develop`

Si aún no tienes la rama `develop`, sigue estos pasos:
1. Cambia a la rama principal (`main`):
   ```sh
   git checkout main
   ```

2. Crea la rama `develop`:
   ```sh
   git checkout -b develop
   ```

3. Sube la rama al repositorio remoto:
   ```sh
   git push -u origin develop
   ```

#### 2. Trabajar en la Rama `develop`

1. Asegúrate de estar en la rama `develop`:
   ```sh
   git checkout develop
   ```

2. Antes de realizar cambios, sincroniza tu rama local con el remoto:
   ```sh
   git pull origin develop
   ```

3. Realiza tus cambios en el proyecto y verifica el estado de los archivos modificados:
   ```sh
   git status
   ```

4. Agrega los cambios al área de preparación:
   ```sh
   git add .
   ```

5. Crea un commit con un mensaje descriptivo:
   ```sh
   git commit -m "Descripción de los cambios realizados"
   ```

6. Sube tus cambios al repositorio remoto:
   ```sh
   git push origin develop
   ```

#### 3. Sincronización Regular
Es importante que sincronices frecuentemente tu rama local con el remoto para evitar conflictos:
   ```sh
   git pull origin develop
   ```

#### 4. Fusionar Cambios en `main`
Solo el líder del proyecto o una persona designada fusionará los cambios desde `develop` a `main` una vez que estén probados y listos para producción:
   ```sh
   git checkout main
   git merge develop
   git push origin main
   ```

### Recomendaciones

- **Comunicación:** Coordina con los demás desarrolladores para evitar trabajar en los mismos archivos al mismo tiempo.
- **Mensajes de Commit Claros:** Utiliza mensajes descriptivos para facilitar el entendimiento de los cambios.
- **Sincronización Regular:** Realiza `git pull` antes de trabajar y después de subir tus cambios.
- **Pruebas Locales:** Asegúrate de que tu código funcione correctamente antes de subirlo.
- **Resolución de Conflictos:** Si surgen conflictos, resuélvelos con cuidado y asegúrate de probar el código antes de subirlo.

---

## API del Proyecto

La API utilizada por este proyecto está disponible en el siguiente repositorio: [FastAPI](https://github.com/CristobalHenriquez/FastApi.git). Por favor, revisa el archivo `README.md` de ese repositorio para más detalles sobre cómo configurarla y usarla.

---

## Personalización de Configuración

Para más detalles sobre cómo personalizar el proyecto, consulta la [Documentación de Vite](https://vite.dev/config/).
