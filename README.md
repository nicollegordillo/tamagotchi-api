<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>API de Tamagotchi Items</h1>

  <p>Esta API proporciona endpoints para administrar items relacionados con Tamagotchis v5 Celebrity.</p>

  <h2>Instalación</h2>
  <ol>
    <li>Clona este repositorio en tu máquina local.</li>
    <li>Instala las dependencias con <code>npm install</code>.</li>
    <li>Configura tu base de datos MySQL.</li>
    <li>Ejecuta la aplicación con <code>npm start</code>.</li>
  </ol>

  <h2>Uso</h2>

  <h3>Endpoints Disponibles</h3>
  <ul>
    <li><code>GET /posts</code>: Obtiene todos los items.</li>
    <li><code>GET /posts/:postId</code>: Obtiene un item por su ID.</li>
    <li><code>POST /posts</code>: Crea un nuevo item.</li>
    <li><code>PUT /posts/:postId</code>: Actualiza un item existente por su ID.</li>
    <li><code>DELETE /posts/:postId</code>: Elimina un item por su ID.</li>
  </ul>

  <h3>Parámetros de Entrada</h3>
  <ul>
    <li><code>name</code>: Nombre del item.</li>
    <li><code>description</code>: Descripción del item.</li>
    <li><code>price</code>: Precio del item.</li>
    <li><code>category</code>: Categoría del item.</li>
    <li><code>image</code>: Imagen en formato base64 del item.</li>
  </ul>

  <h3>Respuestas</h3>
  <ul>
    <li><code>200 OK</code>: La solicitud se realizó con éxito.</li>
    <li><code>201 Created</code>: Se creó un nuevo item.</li>
    <li><code>400 Bad Request</code>: La solicitud no pudo ser procesada debido a datos incorrectos.</li>
    <li><code>404 Not Found</code>: El item solicitado no existe.</li>
    <li><code>500 Internal Server Error</code>: Error interno del servidor.</li>
  </ul>

  <h2>Contribución</h2>
  <p>¡Las contribuciones son bienvenidas! Si tienes sugerencias, correcciones o mejoras, por favor abre un issue o envía un pull request.</p>

  <h2>Licencia</h2>
  <p>Este proyecto está bajo la <a href="https://opensource.org/licenses/MIT">Licencia MIT</a>.</p>
</body>
</html>
