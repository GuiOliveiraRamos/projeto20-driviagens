import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { schemaCity, schemaFlight, schemaTravel } from "../schemas/flights.schemas";
import { newCity, newFlight, newTravel } from "../controllers/flights.controllers";

const flightRoutes = Router()

flightRoutes.post("/flights",validateSchema(schemaFlight), newFlight)
flightRoutes.get("/flights")
flightRoutes.post("/cities", validateSchema(schemaCity), newCity)
flightRoutes.post("/travels", validateSchema(schemaTravel), newTravel)

export default flightRoutes
