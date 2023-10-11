import httpStatus from "http-status";
import flightsServices from "../services/flights.services.js";


export async function newCity(req, res) {
  const { name } = req.body;
  
      const newCity = await flightsServices.createCityService(name);
      res.status(httpStatus.CREATED).send(newCity);      
      
}


export async function newFlight(req, res) {
  const { origin, destination, date } = req.body;  
  
    const newFlight = await flightsServices.createFlightService(origin, destination, date);
    res.status(httpStatus.CREATED).json(newFlight);
  
}

export async function newTravel(req, res) {
  const { passengerId, flightId } = req.body;
 
    const newTravelData = await flightsServices.createNewTravelService(passengerId, flightId);
    res.status(httpStatus.CREATED).json(newTravelData);
  } 


export async function getFlights(req, res) {    

      const originQuery = req.query.origin;
      const destinationQuery = req.query.destination
      const smallerDateQuery = req.query["smaller-date"];
      const biggerDateQuery = req.query["bigger-date"];

      const flights = await flightsServices.getFlightsService(
          originQuery,
          destinationQuery,
          smallerDateQuery,
          biggerDateQuery
      );

      res.status(httpStatus.OK).json(flights.rowCount > 0 ? flights.rows : []);
  } 


