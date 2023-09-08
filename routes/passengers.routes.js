import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaPassenger } from "../schemas/passengers.schemas.js";
import { newPassenger } from "../controllers/passengers.controllers.js";

const passengersRoutes = Router()

passengersRoutes.post("/passengers", validateSchema(schemaPassenger), newPassenger)
passengersRoutes.get("/passengers/travels")

export default passengersRoutes
