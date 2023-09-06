import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { schemaCity, schemaFlight } from "../schemas/flights.schemas";
import { newCity, newFlight } from "../controllers/flights.controllers";

const flightRoutes = Router()

flightRoutes.post("/flights",validateSchema(schemaFlight), newFlight)
flightRoutes.get("/flights")
flightRoutes.post("/cities", validateSchema(schemaCity), newCity)
flightRoutes.post("/travels")

export default flightRoutes
