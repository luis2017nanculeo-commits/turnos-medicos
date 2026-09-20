import { configuracionAgenda } from "./resources.ts"
import { EspecialidadesController } from "./Controller/Especialidades.controller.ts"
import { ProfesionalesController } from "./Controller/Profesionales.controller.ts"
import { GeneralController } from "./Controller/general.controller.ts"
import Express, { type Response, type Request } from "express"
const PORT = process.env.PORT || 3000
const app = Express()

app.use(Express.json())

// ENDPOINTS
// Hello World
app.get("/", GeneralController.helloWorld)

// Especialidades
app.get("/especialidades", EspecialidadesController.getAll)
app.get("/especialidades/:id", EspecialidadesController.findById)
app.post("/especialidades", EspecialidadesController.create)
app.delete("/especialidades/:id", EspecialidadesController.delete)

// Profesionales
app.get("/profesionales", ProfesionalesController.getAll)
app.get("/profesionales/:id", ProfesionalesController.findById)
app.post("/profesionales", ProfesionalesController.create)
app.put("/profesionales/:id", ProfesionalesController.modify)
app.delete("/profesionales/:id", ProfesionalesController.delete)

//404 Not Found
app.use(GeneralController.notFound)

app.listen(PORT, () => {
    console.clear()
    console.log('*******************************************************')
    console.log(`**                                                    **`)
    console.log(`**  Servidor ejecutándose en: http://localhost:${PORT}  **`)
    console.log(`**                                                    **`)
    console.log('*******************************************************')
})

