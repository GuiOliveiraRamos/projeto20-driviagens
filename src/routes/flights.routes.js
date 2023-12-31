import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { getFlights, newCity, newFlight, newTravel } from "../controllers/flights.controllers.js";
import { schemaCity, schemaFlight, schemaTravel } from "../schemas/flights.schemas.js";

const flightRoutes = Router()

flightRoutes.post("/flights",validateSchema(schemaFlight), newFlight)
flightRoutes.get("/flights", getFlights)
flightRoutes.post("/cities", validateSchema(schemaCity), newCity)
flightRoutes.post("/travels", validateSchema(schemaTravel), newTravel)

export default flightRoutes
