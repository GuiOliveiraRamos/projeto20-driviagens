import httpStatus from "http-status";
import passengersService from "../services/passengers.services.js";


export async function newPassenger(req, res) {
  const { firstName, lastName } = req.body;

    const addedPassenger = await passengersService.newPassengerService(firstName, lastName);
    res.status(httpStatus.CREATED).json(addedPassenger);
  
}

export async function getTravelsPassengers(req, res) {
     const nameQuery = req.query.name;
    const passengers = await passengersService.getTravelsPassengersService(nameQuery);

    res.status(httpStatus.OK).json(passengers);
  } 
