# CCL Inventario

MiniSistema de Gestión de Inventario para la empresa **CCL**.

## Demo en vivo

**URL:** https://alejandro270519.github.io/ccl-inventario/

> El demo en línea funciona en modo offline con datos de muestra.
> Para funcionalidad completa con base de datos real, ejecuta el proyecto localmente.

## Credenciales de acceso

```
Usuario:    admin
Contraseña: admin123
```

## Tecnologías

- **Backend:** C# .NET Core 9 + Entity Framework Core + JWT Bearer
- **Frontend:** Angular v19 + TypeScript (standalone components)
- **Base de Datos:** PostgreSQL 17

## Ejecutar localmente

### Requisitos previos

- .NET SDK 9
- Node.js 18+
- PostgreSQL (puerto 5432, usuario `postgres`, contraseña `postgres`)
- Angular CLI v19: `npm install -g @angular/cli@19`

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

La API queda disponible en `http://localhost:5000`.

### Frontend

```bash
cd frontend/ccl-inventario-app
npm install
ng serve
```

La aplicación queda disponible en `http://localhost:4200`.

## Endpoints de la API

| Método | Endpoint                   | Auth | Descripción                     |
|--------|----------------------------|------|---------------------------------|
| POST   | /auth/login                | No   | Autenticación, retorna JWT      |
| GET    | /productos/inventario      | Sí   | Consultar inventario actual     |
| POST   | /productos/movimiento      | Sí   | Registrar entrada o salida      |

### Ejemplo login

```json
POST /auth/login
{
  "usuario": "admin",
  "contrasena": "admin123"
}
```

### Ejemplo movimiento

```json
POST /productos/movimiento
Authorization: Bearer <token>

{
  "productoId": 1,
  "cantidad": 5,
  "tipo": 0
}
```

`tipo`: `0` = Entrada · `1` = Salida

## Productos iniciales (seed)

| ID | Nombre               | Cantidad |
|----|----------------------|----------|
| 1  | Laptop Dell          | 10       |
| 2  | Monitor Samsung      | 15       |
| 3  | Teclado Logitech     | 25       |
| 4  | Mouse Inalámbrico    | 30       |
| 5  | Auriculares Sony     | 8        |
