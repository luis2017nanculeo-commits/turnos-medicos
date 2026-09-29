# TurnosMed – Pacientes y Turnos

## Estructuras de datos

### Paciente

Representa a la persona que solicita turnos.

| Campo | Tipo | Descripción |
|---|---|---|
| `codigo_paciente` | string | Identificador único interno (ej. `PAC-2026-001`). |
| `nombre_completo` | string | Nombre y apellido del paciente. |
| `documento_identificador` | string | Documento de identidad u otro identificador oficial. |
| `fecha_nacimiento` | string (`YYYY-MM-DD`) | Fecha de nacimiento. |
| `email` | string | Correo electrónico de contacto. |
| `telefono` | string | Teléfono en formato internacional (ej. `+541155554321`). |
| `cobertura_salud` | string | Obra social o prepaga y plan (ej. `OSDE 310`). |

### Turno

Representa una cita médica agendada.

| Campo | Tipo | Descripción |
|---|---|---|
| `codigo_turno` | string | Identificador único del turno (ej. `TUR-2026-8941`). |
| `fecha` | string (`YYYY-MM-DD`) | Fecha del turno. |
| `hora` | string (`HH:mm`) | Hora del turno. |
| `especialidad` | string | Especialidad médica (ej. `Cardiología`). |
| `profesional` | string | Profesional que atiende. |
| `nombre_paciente` | string | Nombre del paciente asignado. |
| `estado_turno` | string | Código del estado actual (ver Estados). |

### Estados de turno

Catálogo de estados por los que pasa un turno. Cada estado tiene `codigo`, `nombre` y `descripcion`.

| Código | Descripción |
|---|---|
| `registrado` | El turno fue solicitado y agendado correctamente. |
| `validado` | La cobertura de salud o los datos del turno fueron confirmados. |
| `presente` | El paciente llegó al establecimiento. |
| `en_consulta` | El paciente está siendo atendido por el profesional. |
| `finalizado` | La consulta concluyó. |
| `cancelado` | El turno fue cancelado antes de realizarse. |
| `no_presentado` | El paciente no asistió al turno. |

## Endpoints de Pacientes

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/pacientes` | Lista todos los pacientes activos. |
| GET | `/pacientes/:codigo_paciente` | Devuelve un paciente por su código. `404` si no existe. |
| POST | `/pacientes` | Crea un paciente. Recibe el JSON completo; `400` si faltan campos, `409` si el código ya existe. |
| PUT | `/pacientes` | Actualiza los datos de un paciente. El `codigo_paciente` se envía en el body. |
| DELETE | `/pacientes` | Baja lógica (*soft delete*): marca al paciente como inactivo sin borrarlo. Deja de aparecer en los listados. |

## Endpoints de Turnos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/turnos` | Lista todos los turnos con su estado actual. |
| GET | `/turnos/:codigo_turno` | Devuelve un turno por su código. `404` si no existe. |
| POST | `/turnos` | Crea un turno. Si no se indica `estado_turno`, se asigna `registrado`. |
| PUT | `/turnos` | Modifica un turno. **Es el método que cambia el estado**: se envía `codigo_turno` y el nuevo `estado_turno`, que debe ser uno de los códigos del catálogo de estados; de lo contrario responde `400`. |

### Flujo de estados vía `PUT /turnos`

```
registrado → validado → presente → en_consulta → finalizado
     │           │
     └───────────┴──→ cancelado | no_presentado
```

Ejemplo:

```json
PUT /turnos
{
  "codigo_turno": "TUR-2026-8941",
  "estado_turno": "validado"
}
```