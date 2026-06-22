# CCL Inventario

MiniSistema de Gestión de Inventario para la empresa **CCL**.

## Tecnologías

- **Backend:** C# .NET Core 9 + Entity Framework Core + JWT
- **Frontend:** Angular v19 + TypeScript
- **Base de Datos:** PostgreSQL

## Credenciales de prueba

```
Usuario: admin
Contraseña: admin123
```

## Requisitos

- .NET SDK 9
- Node.js 18+
- Angular CLI v19: `npm install -g @angular/cli@19`
- PostgreSQL (local, puerto 5432)

## Configuración de la Base de Datos

1. Asegúrate de tener PostgreSQL corriendo localmente.
2. El connection string por defecto usa: `Host=localhost;Database=ccl_inventario;Username=postgres;Password=postgres`.
3. Si tus credenciales son distintas, edita `backend/appsettings.json`.

## Ejecutar el Backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

La API queda en `http://localhost:5000`.

## Ejecutar el Frontend

```bash
cd frontend/ccl-inventario-app
npm install
ng serve
```

La app queda en `http://localhost:4200`.

## Endpoints de la API

| Método | Endpoint                   | Auth | Descripción                     |
|--------|----------------------------|------|---------------------------------|
| POST   | /auth/login                | No   | Autenticación, retorna JWT      |
| POST   | /productos/movimiento      | Sí   | Registrar entrada o salida      |
| GET    | /productos/inventario      | Sí   | Consultar inventario actual     |

### Ejemplo: Login

```json
POST /auth/login
{
  "usuario": "admin",
  "contrasena": "admin123"
}
```

### Ejemplo: Movimiento

```json
POST /productos/movimiento
Authorization: Bearer <token>

{
  "productoId": 1,
  "cantidad": 5,
  "tipo": 0
}
```

`tipo`: `0` = Entrada, `1` = Salida.
