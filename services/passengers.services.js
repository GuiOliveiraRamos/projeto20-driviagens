import passengersRepository from "../repositories/passengers.repository.js";

export async function newPassengerService(firstName, lastName) {
    try {
      const newPassenger = await passengersRepository.addPassengerDB(firstName, lastName);
      return newPassenger;
    } catch (err) {
      throw new Error('Erro ao adicionar um novo passageiro');
    }
  }
  

export async function getTravelsPassengersService(nameQuery) {
    try {
        const passengers = await passengersRepository.getTravelsPassengersDB(nameQuery);

        if (passengers.length > 10) {
            throw new Error('Too many results');
        }

        return passengers;
    } catch (err) {
        throw new Error('Erro ao buscar dados de passageiros e viagens');
    }
}

const passengersService = {
    newPassengerService,
    getTravelsPassengersService
}

export default passengersService
