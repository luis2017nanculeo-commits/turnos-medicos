# Turnos-Médicos

Backend para la gestión de turnos médicos. Proyecto en TypeScript sobre Node.js, con Express como dependencia preparada para el desarrollo de la API.

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
│   ├── data/
│   │   ├── especialidades.json   # Listado de especialidades médicas
│   │   └── profesionales.json    # Listado de profesionales
│   ├── resources.ts              # Carga de datos JSON y configuración de agenda
│   └── index.ts                  # Punto de entrada, imprime datos en consola
├── tsconfig.json
├── package.json
└── README.md
```

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