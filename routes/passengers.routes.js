import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaPassenger } from "../schemas/passengers.schemas.js";
import { getTravelsPassengers, newPassenger } from "../controllers/passengers.controllers.js";

const passengersRoutes = Router()

passengersRoutes.post("/passengers", validateSchema(schemaPassenger), newPassenger)
passengersRoutes.get("/passengers/travels", getTravelsPassengers)

export default passengersRoutes
