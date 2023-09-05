import { Router } from "express";

const flightRoutes = Router()

flightRoutes.post("/flights")
flightRoutes.get("/flights")
flightRoutes.post("/cities")
flightRoutes.post("/travels")

export default flightRoutes
