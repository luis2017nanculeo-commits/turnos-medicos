import {configuracionAgenda, arrayProfesionales, arrayEspecialidades } from "./resources.ts"
import type {Especialidad, Profesional } from "./resources.ts"

import Express, {type Response, type Request} from "express"
const PORT = process.env.PORT || 3000
const app = Express()


// MIDDLEWARE
app.use(Express.json())

// ESPECIALIDADES

app.get("/especialidades", (req: Request, res: Response) => {
 try {
  res.status(200)
    .json(arrayEspecialidades)
} catch (error) {
  res.status(400)
    .json({ success: false, message: "Error al intentar enviar los datos de especialidades." });
}
});

app.get("/especialidades/:id", (req: Request, res: Response) => {
 try {
  const especialidadId: number | undefined = Number(req.params.id)

  if (!especialidadId) {
    throw new Error('Error al obtener el código de la especialidad.')
  }

  const especialidadSolicitada = arrayEspecialidades.find((esp: any) => esp.especialidadId === especialidadId)

if (!especialidadSolicitada) {
  throw new Error('No se encontró la especialidad indicada.')
} else {
  console.clear()
  console.table(especialidadSolicitada)
  res.status(200)
    .json(especialidadSolicitada)
}

} catch (error) {
  res.status(400)
    .json({ success: false, message: "Error al intentar obtener la especialidad." });
}
});


app.post("/especialidades", (req: Request, res: Response) => {

    try {
  const {nombreEspecialidad, activa} = req.body

  const nuevaEspecialidad: Especialidad = {
    especialidadId: arrayEspecialidades.length + 1,
    nombreEspecialidad: nombreEspecialidad,
    activa: Boolean(activa)
  }
  arrayEspecialidades.push(nuevaEspecialidad)

  console.clear()
  console.table(nuevaEspecialidad)
  res.status(201)
    .json(nuevaEspecialidad)


} catch (error) {
  res.status(400).json({ success: false, message: (error as Error).message });
}
});


app.delete("/especialidades/:id", (req: Request, res: Response) => {
try {
  const expecialidadId: number = Number(req.params.id as string)

  const indice: number = arrayEspecialidades.findIndex((esp: any) => esp.especialidadId === expecialidadId)

  if (indice > -1) {
    arrayEspecialidades[indice].activa = false

    res.status(204)
      .json({})
  }

} catch (error) {
  res.status(500).json({ error: 'Error interno del servidor' });

}
});

app.put("/especialidades/:id", (req: Request, res: Response) => {
  try {
    const especialidadId = req.params.id
    const { nombreEspecialidad, activa } = req.body

    if (!nombreEspecialidad || typeof nombreEspecialidad !== "string") {
      throw new Error('El campo "nombreEspecialidad" es obligatorio y debe ser un texto.')
    }

    const indice = arrayEspecialidades.findIndex((esp: any) => esp.especialidadId === Number(especialidadId))

    if (indice > -1) {
      arrayEspecialidades[indice].nombreEspecialidad = nombreEspecialidad
      arrayEspecialidades[indice].activa = Boolean(activa)

      res.status(200)
        .json(arrayEspecialidades[indice])
    } else {
      throw new Error('No se encontró la especialidad indicada.')
    }

  } catch (error) {
    res.status(400)
      .json({ success: false, message: (error as Error).message })
  }
});

// PROFESIONALES MEDICOS

app.get("/profesionales", (req: Request, res: Response) => {
try {
  const profesionalesFiltrados: [] = arrayProfesionales.filter((prof: any) => prof.activo === true)

  res.status(200)
    .json(profesionalesFiltrados)
} catch (error) {
  res.status(400)
    .json({status: false, errorMessage: "Verifica el código de especialidad enviado."})
}
});

app.get("/profesionales/:id", (req: Request, res: Response) => {
  try {
  const profesionalId = req.params.id

  const profesionalSeleccionado = arrayProfesionales.find((prof: any) => prof.profesionalId === Number(profesionalId))

  if (profesionalSeleccionado) {
    res.status(200)
      .json(profesionalSeleccionado)
  } else {
    throw new Error('Error al buscar un Profesional médico.')
  }

} catch (error) {
  res.status(400)
    .json({status: false, errorMessage: (error as Error).message || "Error buscando un profesional."})
}
});

app.post("/profesionales", (req: Request, res: Response) => {
 try {
  const { nombre, especialidad, activo } = req.body

  const nuevoProfesional: Profesional = {
    profesionalId: arrayProfesionales.length + 1,
    nombre: nombre,
    especialidad: especialidad,
    activo: Boolean(activo)
  }

  arrayProfesionales.push(nuevoProfesional)

  res.status(201)
    .json(nuevoProfesional)

} catch (error) {
  res.status(400)
    .json({status: false, errorMessage: (error as Error).message || "Error creando un nuevo profesional."})
}
});

app.put("/profesionales/:id", (req: Request, res: Response) => {
 try {
  const profesionalId = req.params.id
  const { nombre, especialidad, activo } = req.body

  const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))
  if (indice > -1) {
    arrayProfesionales[indice].nombre = nombre
    arrayProfesionales[indice].especialidad = especialidad
    arrayProfesionales[indice].activo = Boolean(activo)

    res.status(200)
      .json(arrayProfesionales[indice])

  } else {
    throw new Error('No se encontró el profesional indicado.')
  }

} catch (error) {
  res.status(400)
  .json({status: false, errorMessage: (error as Error).message || "Error al modificar datos de un profesional."})
}
});


app.delete("/profesionales/:id", (req: Request, res: Response) => {
try {
  const profesionalId = req.params.id
  const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))

  if (indice > -1) {
    arrayProfesionales[indice].activo = false
    res.status(204)
      .json({})
  } else {
    throw new Error('Error al intentar cambiar el estado activo de un profesional.')
  }

} catch (error) {
  res.status(400)
    .json({status: false, errorMessage: (error as Error).message || "Error al intentar realizar la operación."})
}
});


app.use((req: Request, res: Response) => {
  try {
    res.status(404).json({
      error: 'Endpoint no encontrado',
      ruta: req.originalUrl,
      metodo: req.method
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
})
