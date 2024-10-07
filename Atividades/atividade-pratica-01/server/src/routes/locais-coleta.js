import { Router } from "express";
import { GetAllLocalController } from "../controller/locais-coleta/GetAllLocalController.js";
import { GetByIdLocalController } from "../controller/locais-coleta/GetByIdLocalController.js";
import { CreateLocalController } from "../controller/locais-coleta/CreateLocalController.js"
import { UpdateLocalController } from "../controller/locais-coleta/UpdateLocalController.js";
import { DeleteLocalController } from "../controller/locais-coleta/DeleteLocalController.js";

const localRouter = Router()

// Get All
const getAllLocalController = new GetAllLocalController();
localRouter.get('/locais-coleta', getAllLocalController.handle);

// Get by ID
const getByIdLocalController = new GetByIdLocalController();
localRouter.get('/locais-coleta/:id', getByIdLocalController.handle)

// Create
const createLocalController = new CreateLocalController();
localRouter.post('/locais-coleta', createLocalController.handle)

// Update
const updateLocalController = new UpdateLocalController();
localRouter.patch('/locais-coleta', updateLocalController.handle)

// Delete
const deleteLocalController = new DeleteLocalController();
localRouter.delete('/locais-coleta', deleteLocalController.handle)

export { localRouter }