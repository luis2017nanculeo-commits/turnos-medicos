import { arrayProfesionales} from "../resources.ts"
import type { Profesional } from "../resources.ts"
import { type Response, type Request } from "express"

export class ProfesionalesController {
// getAll - findById, create, modify, delete
static statusCode = 200

static getAll = async (req: Request, res: Response) => {
    this.statusCode = 200
  try {
    return res.status(this.statusCode)
      .json(arrayProfesionales)

  } catch (error: any) {
    this.statusCode = 400
    return res.status(this.statusCode)
      .json({success: false, message:  (error as Error).message })
  }
}

static findById = async (req: Request, res: Response) => {
    this.statusCode = 200
    try {
        const profesionalId = req.params.id

        if (!profesionalId) {
            this.statusCode = 400
            throw new Error('Verifica el código ó ID del Profesional.')
        }

        const profesionalSeleccionado = arrayProfesionales.find((prof: any) => prof.profesionalId === Number(profesionalId))

        if (!profesionalSeleccionado) {
            this.statusCode = 404
            throw new Error('Verifica el código ó ID del Profesional.')
        }

        return res.status(this.statusCode)
            .json(profesionalSeleccionado)

    } catch (error: any) {
        return res.status(this.statusCode)
            .json({ status: false, errorMessage: (error as Error).message })
    }
};

static create = async  (req: Request, res: Response) => {
    this.statusCode = 201
 try {
  const { nombre, especialidad, activo } = req.body

if (!nombre || !especialidad || !activo) {
    this.statusCode = 400
          throw new Error('Verifica los datos del nuevo Profesional a crear.')
  }

  const nuevoProfesional: Profesional = {
    profesionalId: arrayProfesionales.length + 1,
    nombre: nombre,
    especialidad: especialidad,
    activo: Boolean(activo)
  }

  arrayProfesionales.push(nuevoProfesional)

  return res.status(this.statusCode)
    .json(nuevoProfesional)

} catch (error) {
  return res.status(this.statusCode)
    .json({status: false, errorMessage: (error as Error).message})
}
};

static modify = async  (req: Request, res: Response) => {
    this.statusCode = 200
 try {
  const profesionalId = req.params.id

  if (!profesionalId) {
    this.statusCode = 400
          throw new Error('Verifica el código ó ID del Profesional a buscar.')
  }

  const { nombre, especialidad, activo } = req.body

  if (!nombre || !especialidad || !activo) {
    this.statusCode = 400
          throw new Error('Verifica los datos del nuevo Profesional a Modificar.')
  }

  const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))
 
 if (indice === -1) {
    this.statusCode = 404
          throw new Error('No se encontro un Profesional con el código indicado.')
  }
 
  if (indice > -1) {
    arrayProfesionales[indice].nombre = nombre
    arrayProfesionales[indice].especialidad = especialidad
    arrayProfesionales[indice].activo = Boolean(activo)

    return res.status(this.statusCode)
      .json(arrayProfesionales[indice])

  } else {
    throw new Error('No se encontró el profesional indicado.')
  }

} catch (error) {
  return res.status(this.statusCode)
  .json({status: false, errorMessage: (error as Error).message})
}
};


static delete = async  (req: Request, res: Response) => {
    this.statusCode = 204
try {
  const profesionalId = req.params.id

 if (!profesionalId) {
    this.statusCode = 400
          throw new Error('Verifica el código ó ID del Profesional a buscar.')
  }

  const indice = arrayProfesionales.findIndex((prof: any) => prof.profesionalId === Number(profesionalId))

  if (indice === -1) {
    this.statusCode = 404
    } else {
    throw new Error('Error al intentar cambiar el estado activo de un profesional.')
  }
  arrayProfesionales[indice].activo = false
    return res.status(this.statusCode)
      .json({})
  

} catch (error) {
  return res.status(this.statusCode)
    .json({status: false, errorMessage: (error as Error).message})
}
};

}