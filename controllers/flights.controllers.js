import flightsServices from "../services/flights.services.js";


export async function newCity(req, res) {
  const { name } = req.body;

  try {
      const newCity = await flightsServices.createCityService(name);
      res.status(201).send(newCity);
  } catch (error) {
      res.status(500).send(error.message);
  }
}


export async function newFlight(req, res) {
  const { origin, destination, date } = req.body;

  try {
    const newFlight = await flightsServices.createFlightService(origin, destination, date);
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function newTravel(req, res) {
  const { passengerId, flightId } = req.body;

  try {
    const newTravelData = await flightsServices.createNewTravelService(passengerId, flightId);
    res.status(201).json(newTravelData);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function getFlights(req, res) {
  try {
      console.log('Entering getFlights function...');

      const originQuery = parseInt(req.query.origin);
      const destinationQuery = parseInt(req.query.destination);
      const smallerDateQuery = req.query["smaller-date"];
      const biggerDateQuery = req.query["bigger-date"];

      const flights = await flightsServices.getFlightsService(
          originQuery,
          destinationQuery,
          smallerDateQuery,
          biggerDateQuery
      );

      console.log('getFlights function executed successfully.');
      res.status(200).json(flights);
  } catch (err) {
      console.error('Error in getFlights function:', err);
      res.status(500).send(err.message);
  }
}


