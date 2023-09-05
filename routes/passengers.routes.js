import { Router } from "express";

const passengersRoutes = Router()

passengersRoutes.post("/passengers")
passengersRoutes.get("/passengers/travels")

export default passengersRoutes
