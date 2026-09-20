import { arrayEspecialidades } from "../resources.ts"
import type { Especialidad } from "../resources.ts"
import { type Response, type Request } from "express"

export class EspecialidadesController {
    // getAll - findById, create, modify, delete
    static getAll = async (req: Request, res: Response) => {
        try {
            const especialidadesActivas = arrayEspecialidades.filter((esp: any) => esp.activa === true)

            if (!especialidadesActivas) {
                throw new Error('No hay especialidad activas en este momento.')
            }

            return res.status(200)
                .json(especialidadesActivas)

        } catch (error: any) {
            return res.status(400)
                .json({success: false, message: error.message})
        }
    }

    static findById = async  (req: Request, res: Response) => {
 try {
  const especialidadId: number | undefined = Number(req.params.id)

  if (!especialidadId) {
    throw new Error('Verifica el código ó ID de la especialidad que buscas.')
  }

  const especialidadSolicitada = arrayEspecialidades.find((esp: any) => esp.especialidadId === especialidadId)

if (!especialidadSolicitada) {
  throw new Error('No se encontró una especialidad con el código ó ID indicado.')
} else {
  console.clear()
  console.table(especialidadSolicitada)
  return res.status(200)
    .json(especialidadSolicitada)
}

} catch (error) {
  return res.status(400)
    .json({ success: false, message: (error as Error).message});
}
};
    static create = async  (req: Request, res: Response) => {

    try {
  const {nombreEspecialidad, activa} = req.body
  
  if (!nombreEspecialidad || !activa) {
          throw new Error('Verifica los datos enviados para la nueva especialidad.')
  }
  const nuevaEspecialidad: Especialidad = {
    especialidadId: arrayEspecialidades.length + 1,
    nombreEspecialidad: nombreEspecialidad,
    activa: Boolean(activa)
  }
  arrayEspecialidades.push(nuevaEspecialidad)

     return res.status(201)
    .json(nuevaEspecialidad)

} catch (error) {
  return res.status(400).json({ success: false, message: (error as Error).message });
}
};

    static modify = async  (req: Request, res: Response) => {
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

      return res.status(200)
        .json(arrayEspecialidades[indice])
    } else {
      throw new Error('No se encontró la especialidad indicada.')
    }

  } catch (error) {
    return res.status(400)
      .json({ success: false, message: (error as Error).message })
  }
};
    static delete = async  (req: Request, res: Response) => {
try {
  const especialidadId: number = parseInt(req.params.id as string)
 
  if (!especialidadId) {
          throw new Error('Verifica el código ó ID de la especialidad.')
  }

  const indice: number = arrayEspecialidades.findIndex((esp: any) => esp.especialidadId === especialidadId)
 
  if (!especialidadId) {
          throw new Error('No se encontro especialidad con el código indicado.')
  }
    arrayEspecialidades[indice].activa = false
        return res.status(200)
            .json(arrayEspecialidades[indice])

 } catch (error: any) {
  return res.status(400).json({ success: false, message: (error as Error).message });
 }
};

}
