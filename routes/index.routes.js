import { Router } from "express";
import flightRoutes from "./flights.routes.js";
import passengersRoutes from "./passengers.routes.js";

const router = Router();

router.use(flightRoutes)
router.use(passengersRoutes)

export default router;