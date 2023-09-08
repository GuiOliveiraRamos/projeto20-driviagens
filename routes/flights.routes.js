import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { schemaCity, schemaFlight, schemaTravel } from "../schemas/flights.schemas.js";
import { newCity, newFlight, newTravel } from "../controllers/flights.controllers.js";

const flightRoutes = Router()

flightRoutes.post("/flights",validateSchema(schemaFlight), newFlight)
flightRoutes.get("/flights")
flightRoutes.post("/cities", validateSchema(schemaCity), newCity)
flightRoutes.post("/travels", validateSchema(schemaTravel), newTravel)

export default flightRoutes
