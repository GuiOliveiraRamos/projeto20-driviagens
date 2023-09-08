import validateSchema from "../middlewares/validateSchema.js";
import { addCityDB, cityExistsByNameDB, getFlightsDB, getTravelsPassengersDB } from "../repositories/flights.repository.js";
import { schemaGetFlights } from "../schemas/flights.schemas.js";

export async function newCity(req, res) {
    const { name } = req.body;

    try {
        const cityAlreadyExists = await cityExistsByNameDB(name);

        if (cityAlreadyExists) {
            res.status(409).json({ error: "Cidade já existe" });
        } else {
            const newCity = await addCityDB(name);
            res.status(201).json(newCity);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function newFlight (req,res) {
    const {origin, destination,date} = req.body
    try {
        const originCityExists = await db.query(`SELECT 1 FROM cities WHERE id = $1`, [origin]);
        const destinationCityExists = await db.query(`SELECT 1 FROM cities WHERE id = $1`, [destination]);

        if (originCityExists.rowCount === 0 || destinationCityExists.rowCount === 0) {
            res.status(404).json({ error: "Cidade de origem ou destino não encontrada" });
        } else {
            const currentDate = new Date();
            const flightDate = new Date(date);

            if (flightDate <= currentDate) {
                res.status(422).json({ error: "A data do voo deve ser maior do que a data atual" });
            } else {
                const existingFlight = await db.query(`SELECT * FROM flights WHERE origin = $1 AND destination = $2`, [origin, destination]);
                if (existingFlight.rows.length > 0) {
                    res.status(409).json({ error: "Voo já existe" });
                } else {
                    const addFlight = await db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`, [origin, destination, date]);
                    res.status(201).json(addFlight.rows[0]);
                }
            }
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function newTravel (req,res) {
  const {passengerId, flightId} = req.body
  try {
    const passengerExists = await db.query(`SELECT 1 FROM passengers WHERE id = $1`, [passengerId]);
    const flightExists = await db.query(`SELECT 1 FROM flights WHERE id = $1`, [flightId]);

    if (passengerExists.rowCount === 0 || flightExists.rowCount === 0) {
      res.status(404).json({ error: "Passageiro ou voo não encontrado" });
    }
    
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getFlights(req, res) {
    try {
        const originQuery = req.query.origin;
        const destinationQuery = req.query.destination;
        const smallerDateQuery = req.query['smaller-date'];
        const biggerDateQuery = req.query['bigger-date'];

        if (!(smallerDateQuery && biggerDateQuery)) {
            res.status(422).send('Ambos os parâmetros smaller-date e bigger-date devem ser fornecidos.');
            return;
        }

        const smallerDate = smallerDateQuery.split('-').reverse().join('-');
        const biggerDate = biggerDateQuery.split('-').reverse().join('-');

        if (smallerDate > biggerDate) {
            res.status(400).send('A data smaller-date não pode ser maior do que bigger-date.');
            return;
        }

        validateSchema(schemaGetFlights)

        const flights = await getFlightsDB(originQuery, destinationQuery, smallerDate, biggerDate);

        res.status(200).json(flights);
    } catch (err) {
        res.status(500).send('Erro ao buscar dados de voos');
    }
}


export async function getTravelsPassengers(req, res) {
    try {
        const nameQuery = req.query.name;
        const passengers = await getTravelsPassengersDB(nameQuery);

        if (passengers.length > 10) {
            res.status(500).send('Too many results');
            return;
        }

        res.status(200).json(passengers);
    } catch (err) {
        res.status(500).send('Erro ao buscar dados de passageiros e viagens');
    }
}



