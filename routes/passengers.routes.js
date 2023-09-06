import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { schemaPassenger } from "../schemas/passengers.schemas";
import { newPassenger } from "../controllers/passengers.controllers";

const passengersRoutes = Router()

passengersRoutes.post("/passengers", validateSchema(schemaPassenger), newPassenger)
passengersRoutes.get("/passengers/travels")

export default passengersRoutes
