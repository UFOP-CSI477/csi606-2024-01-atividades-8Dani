import { Router } from "express";
import { GetAllTipoController } from "../controller/tipo-sanguineo/GetAllTipoController.js";
import { GetByIdTipoController } from "../controller/tipo-sanguineo/GetByIdTipoController.js";
import { CreateTipoController } from "../controller/tipo-sanguineo/CreateTipoController.js"
import { UpdateTipoController } from "../controller/tipo-sanguineo/UpdateTipoController.js";
import { DeleteTipoController } from "../controller/tipo-sanguineo/DeleteTipoController.js";

const tipoRouter = Router()

// Get All
const getAllTipoController = new GetAllTipoController();
tipoRouter.get('/tipo-sanguineo', getAllTipoController.handle);

// Get by ID
const getByIdTipoController = new GetByIdTipoController();
tipoRouter.get('/tipo-sanguineo/:id', getByIdTipoController.handle)

// Create
const createTipoController = new CreateTipoController();
tipoRouter.post('/tipo-sanguineo', createTipoController.handle)

// Update
const updateTipoController = new UpdateTipoController();
tipoRouter.patch('/tipo-sanguineo', updateTipoController.handle)

// Delete
const deleteTipoController = new DeleteTipoController();
tipoRouter.delete('/tipo-sanguineo', deleteTipoController.handle)

export { tipoRouter }