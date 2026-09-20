# Turnos-Médicos

Backend para la gestión de turnos médicos. API REST desarrollada en TypeScript sobre Node.js con Express, que expone endpoints CRUD para especialidades y profesionales médicos.

## Requisitos

- Node.js v24+
- npm v11+

## Instalación

```bash
npm install
```

## Scripts disponibles

| Comando         | Descripción                                              |
|-----------------|-----------------------------------------------------------|
| `npm run dev`   | Ejecuta `src/index.ts` directo con Node (`--watch`, recarga automática) |
| `npm run build` | Compila TypeScript a JavaScript en `dist/`                |
| `npm start`     | Ejecuta el build compilado (`dist/index.js`)               |

## Estructura del proyecto

```
Turnos-Medicos/
├── src/
│   ├── Controller/
│   │   ├── general.controller.ts        # Hello World y manejo de 404
│   │   ├── Especialidades.controller.ts # CRUD de especialidades
│   │   └── Profesionales.controller.ts  # CRUD de profesionales
│   ├── data/
│   │   ├── especialidades.json   # Listado de especialidades médicas
│   │   └── profesionales.json    # Listado de profesionales
│   ├── resources.ts              # Carga de datos JSON y configuración de agenda
│   └── index.ts                  # Punto de entrada, define rutas Express
├── tsconfig.json
├── package.json
└── README.md
```

## Endpoints disponibles

El servidor corre por defecto en `http://127.0.0.1:3000` (variable `PORT` opcional).

### General

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/`  | Mensaje de bienvenida del servidor |

### Especialidades

| Método | Ruta                  | Descripción                                              |
|--------|-----------------------|-----------------------------------------------------------|
| GET    | `/especialidades`     | Lista las especialidades activas                          |
| GET    | `/especialidades/:id` | Busca una especialidad por `especialidadId`               |
| POST   | `/especialidades`     | Crea una especialidad. Body: `{ nombreEspecialidad, activa }` |
| DELETE | `/especialidades/:id` | Desactiva (soft delete) una especialidad (`activa = false`) |

> Nota: `Especialidades.controller.ts` aún no implementa `PUT` para modificar una especialidad existente.

### Profesionales

| Método | Ruta                | Descripción                                                        |
|--------|---------------------|----------------------------------------------------------------------|
| GET    | `/profesionales`     | Lista todos los profesionales                                        |
| GET    | `/profesionales/:id` | Busca un profesional por `profesionalId`                             |
| POST   | `/profesionales`     | Crea un profesional. Body: `{ nombre, especialidad, activo }`        |
| PUT    | `/profesionales/:id` | Modifica un profesional existente. Body: `{ nombre, especialidad, activo }` |
| DELETE | `/profesionales/:id` | Desactiva (soft delete) un profesional (`activo = false`)            |

Cualquier ruta no definida devuelve `404` con `{ error, ruta, metodo }`.

## Datos de ejemplo

- **especialidades.json**: 20 especialidades médicas (`especialidadId`, `nombreEspecialidad`, `activa`).
- **profesionales.json**: 30 profesionales asociados a las especialidades (`profesionalId`, `nombre`, `especialidad`, `activo`).

Estos archivos son datos de prueba (mock) para el desarrollo inicial y deberán reemplazarse por una fuente de datos real (base de datos) más adelante.

## Configuración de agenda

En `resources.ts` se define `configuracionAgenda`, con los parámetros generales de disponibilidad de turnos:

```ts
interface Parametria {
  fechaMaxima: string; // Formato ISO: "2026-12-30"
  horaMinima: string;  // Formato HH:mm: "07:00"
  horaMaxima: string;  // Formato HH:mm: "13:00"
}
```

## Uso de Claude (Anthropic) en este proyecto

Como parte del proceso de aprendizaje y desarrollo, se utilizó Claude como asistente para las siguientes tareas puntuales:

- **Generación de datos de prueba**: creación de los arrays JSON de `especialidades.json` (20 registros) y `profesionales.json` (30 registros), relacionando cada profesional con una especialidad existente.


La lógica de negocio, la arquitectura del backend (API con Express, endpoints, validaciones, conexión a base de datos, etc.) y las decisiones de diseño del proyecto son responsabilidad del autor y quedan pendientes de desarrollo, no generadas por IA.

> **Nota para quien continúe el proyecto**: los datos en `src/data/*.json` son ficticios y fueron generados automáticamente; no representan profesionales ni especialidades reales.

## Autor

Luis Antonio Ñanculeo