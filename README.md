# API REST de Gestión de Tareas

API REST desarrollada para administrar tareas personales. Permite crear, consultar, actualizar y eliminar registros mediante solicitudes HTTP y respuestas en formato JSON.

## Tecnologías utilizadas

- Java 17
- Spring Boot 4.0.8
- Spring Data JPA
- Maven
- PostgreSQL
- H2 Database para pruebas locales
- Docker
- Render
- Neon
- Postman
- Spring Web
- Jakarta Validation
- Git y GitHub
- HTML, CSS y JavaScript

## Repositorio de código

https://github.com/hust-gif/api-tareas

## URL de producción

```text
Pendiente de publicación en Render
```

## Endpoints

| Método | Ruta | Descripción | Código exitoso |
|---|---|---|---|
| POST | `/api/tareas` | Crear una tarea | 201 Created |
| GET | `/api/tareas` | Consultar todas las tareas | 200 OK |
| GET | `/api/tareas/{id}` | Consultar una tarea por ID | 200 OK |
| PUT | `/api/tareas/{id}` | Actualizar una tarea | 200 OK |
| DELETE | `/api/tareas/{id}` | Eliminar una tarea | 204 No Content |

## Crear una tarea

### Solicitud

```http
POST /api/tareas
Content-Type: application/json
```

```json
{
  "titulo": "Preparar exposición",
  "descripcion": "Preparar las diapositivas para la clase",
  "completada": false,
  "fechaLimite": "2026-09-15"
}
```

### Respuesta

Código HTTP:

```text
201 Created
```

```json
{
  "id": 1,
  "titulo": "Preparar exposición",
  "descripcion": "Preparar las diapositivas para la clase",
  "completada": false,
  "fechaLimite": "2026-09-15"
}
```

## Consultar todas las tareas

```http
GET /api/tareas
```

Respuesta:

```text
200 OK
```

## Consultar una tarea por ID

```http
GET /api/tareas/1
```

Respuesta exitosa:

```text
200 OK
```

Si el registro no existe:

```text
404 Not Found
```

## Actualizar una tarea

```http
PUT /api/tareas/1
Content-Type: application/json
```

```json
{
  "titulo": "Preparar exposición actualizada",
  "descripcion": "Terminar y revisar las diapositivas",
  "completada": true,
  "fechaLimite": "2026-09-16"
}
```

Respuesta:

```text
200 OK
```

## Eliminar una tarea

```http
DELETE /api/tareas/1
```

Respuesta:

```text
204 No Content
```

## Validaciones

El campo `titulo` es obligatorio y no puede superar 100 caracteres.

El campo `descripcion` no puede superar 500 caracteres.

El campo `completada` es obligatorio.

Ejemplo de respuesta por datos incorrectos:

```json
{
  "fecha": "2026-09-04T18:00:00",
  "estado": 400,
  "mensaje": "Los datos enviados no son válidos",
  "errores": {
    "titulo": "El título es obligatorio"
  }
}
```

## Códigos HTTP

| Código | Significado |
|---:|---|
| 200 | Solicitud realizada correctamente |
| 201 | Registro creado correctamente |
| 204 | Registro eliminado sin contenido de respuesta |
| 400 | Datos enviados incorrectos |
| 404 | Registro no encontrado |
| 500 | Error interno del servidor |



## Interfaz web

El proyecto incluye una interfaz web desarrollada con HTML, CSS y JavaScript.
Esta interfaz permite crear, consultar, actualizar y eliminar tareas mediante
la comunicación con la API REST.

La interfaz está disponible localmente en:

```text
http://localhost:8080/


### 4. Agregar ejemplo del listado

Debajo de `GET /api/tareas` y del código `200 OK`, agrega:

```markdown
Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "titulo": "Preparar exposición",
    "descripcion": "Preparar las diapositivas para la clase",
    "completada": false,
    "fechaLimite": "2026-09-15"
  }
]




### 5. URL de producción

Como Render todavía está fallando, deja honestamente:

```markdown
## URL de producción

El despliegue se encuentra pendiente de corrección en Render.

URL asignada:

https://api-tareas-hust.onrender.com



## Ejecución local

```bash
mvnw.cmd spring-boot:run
```

La API estará disponible en:

```text
http://localhost:8080/api/tareas
```

## Autor

Proyecto individual desarrollado para la asignatura de Desarrollo Web / Backend.
