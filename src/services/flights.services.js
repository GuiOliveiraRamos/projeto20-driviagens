import { notFound } from "../errors/notFoundError.js";
import { conflictError } from "../errors/conflictError.js";
import { invalidFlightDate } from "../errors/invalidFlightDate.js";
import flightsRepository from "../repositories/flights.repository.js";
import { badRequest } from "../errors/badRequest.js";

async function createCityService(name) {
    const cityAlreadyExists = await flightsRepository.cityExistsByNameDB(name);

    if (cityAlreadyExists) {
        throw conflictError("Cidade já está cadastrada");
    }
    const newCity = await flightsRepository.addCityDB(name);
    return newCity;
}


export async function createFlightService(origin, destination, date) {
    const originCityExists = await flightsRepository.cityExistsByIdDB(origin);
    const destinationCityExists = await flightsRepository.cityExistsByIdDB(destination);

    if (!originCityExists || !destinationCityExists) {
        throw notFound("Cidade de origem ou destino não encontrada"); 
    }

    const currentDate = new Date();
    const flightDate = new Date(date);
    console.log("date de hoje:", currentDate)
    console.log("data do vôo:", flightDate)

    if (flightDate <= currentDate) {
        throw invalidFlightDate("A data do voo deve ser maior do que a data atual");
    }

    if (origin === destination) {
        throw conflictError("Origem e destino não podem ser iguais");
    }

    const newFlight = await flightsRepository.addFlightDB(origin, destination, date);
    return newFlight;
}

export async function createNewTravelService(passengerId, flightId) {
    const passengerExists = await flightsRepository.passengerExistsByIdDB(passengerId);
    const flightExists = await flightsRepository.flightExistsByIdDB(flightId);

    if (!passengerExists || !flightExists) {
        throw notFound("Passageiro ou voo não encontrado");
    }

    const insertNewTravel = await flightsRepository.insertNewTravel(passengerId, flightId);

    return insertNewTravel;
}

export async function getFlightsService(originQuery, destinationQuery, smallerDateQuery, biggerDateQuery) {
    
        const smallerDate = smallerDateQuery.split('-').reverse().join('-');
        const biggerDate = biggerDateQuery.split('-').reverse().join('-');
    
        if (smallerDate > biggerDate) {
            throw badRequest();
        }

        const flights = await flightsRepository.getFlightsDB(originQuery, destinationQuery, smallerDate, biggerDate);

        return flights;    
}



const flightsServices = {
    createCityService,
    createFlightService,
    createNewTravelService,
    getFlightsService
}

export default flightsServices