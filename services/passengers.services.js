import { badRequest } from "../errors/badRequest.js";
import passengersRepository from "../repositories/passengers.repository.js";

export async function newPassengerService(firstName, lastName) {
   
      const newPassenger = await passengersRepository.addPassengerDB(firstName, lastName);
      return newPassenger;
     
  }
  

export async function getTravelsPassengersService(nameQuery) {
    
        const passengers = await passengersRepository.getTravelsPassengersDB(nameQuery);

        if (passengers.length > 10) {
            throw badRequest('Too many results');
        }

        return passengers;   
}

const passengersService = {
    newPassengerService,
    getTravelsPassengersService
}

export default passengersService
