import passengersService from "../services/passengers.services.js";


export async function newPassenger(req, res) {
  const { firstName, lastName } = req.body;

  try {
    const addedPassenger = await passengersService.newPassengerService(firstName, lastName);
    res.status(201).json(addedPassenger);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function getTravelsPassengers(req, res) {
  try {
    const nameQuery = req.query.name;
    const passengers = await passengersService.getTravelsPassengersService(nameQuery);

    res.status(200).json(passengers);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
