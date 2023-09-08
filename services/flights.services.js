import validateSchema from "../middlewares/validateSchema.js";
import flightsRepository from "../repositories/flights.repository.js";
import { schemaGetFlights } from "../schemas/flights.schemas.js";

export async function createCityService(name) {
    const cityAlreadyExists = await flightsRepository.cityExistsByIdDB(name);

    if (cityAlreadyExists) {
        throw new Error("Cidade já existe");
    }

    const newCity = await flightsRepository.addCityDB(name);
    return newCity;
}

export async function createFlightService(origin, destination, date) {
    const originCityExists = await flightsRepository.cityExistsByIdDB(origin);
    const destinationCityExists = await flightsRepository.cityExistsByIdDB(destination);

    if (!originCityExists || !destinationCityExists) {
        throw new Error("Cidade de origem ou destino não encontrada");
    }

    const currentDate = new Date();
    const flightDate = new Date(date);

    if (flightDate <= currentDate) {
        throw new Error("A data do voo deve ser maior do que a data atual");
    }

    const flightAlreadyExists = await flightsRepository.flightExistsByOriginAndDestinationDB(origin, destination);

    if (flightAlreadyExists) {
        throw new Error("Voo já existe");
    }

    const newFlight = await flightsRepository.addFlightDB(origin, destination, date);
    return newFlight;
}

export async function createNewTravelService(passengerId, flightId) {
    const passengerExists = await flightsRepositoryitory.passengerExistsByIdDB(passengerId);
    const flightExists = await flightsRepository.flightExistsByIdDB(flightId);

    if (!passengerExists || !flightExists) {
        throw new Error("Passageiro ou voo não encontrado");
    }

    return { passengerId, flightId };
}

export async function getFlightsService(originQuery, destinationQuery, smallerDateQuery, biggerDateQuery) {
    try {
        if (!(smallerDateQuery && biggerDateQuery)) {
            throw new Error('Ambos os parâmetros smaller-date e bigger-date devem ser fornecidos.');
        }

        const smallerDate = smallerDateQuery.split('-').reverse().join('-');
        const biggerDate = biggerDateQuery.split('-').reverse().join('-');

        if (smallerDate > biggerDate) {
            throw new Error('A data smaller-date não pode ser maior do que bigger-date.');
        }

        validateSchema(schemaGetFlights);

        const flights = await flightsRepository.getFlightsDB(originQuery, destinationQuery, smallerDate, biggerDate);

        return flights;
    } catch (err) {
        throw new Error('Erro ao buscar dados de voos');
    }
}

const flightsServices = {
    createCityService,
    createFlightService,
    createNewTravelService,
    getFlightsService
}

export default flightsServices