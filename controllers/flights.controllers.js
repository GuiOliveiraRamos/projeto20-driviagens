import flightsServices from "../services/flights.services.js";


export async function newCity(req, res) {
  const { name } = req.body;
  
      const newCity = await flightsServices.createCityService(name);
      res.status(201).send(newCity);      
      
}


export async function newFlight(req, res) {
  const { origin, destination, date } = req.body;  
  
    const newFlight = await flightsServices.createFlightService(origin, destination, date);
    res.status(201).json(newFlight);
  
}

export async function newTravel(req, res) {
  const { passengerId, flightId } = req.body;
 
    const newTravelData = await flightsServices.createNewTravelService(passengerId, flightId);
    res.status(201).json(newTravelData);
  } 


export async function getFlights(req, res) {    

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
  } 


