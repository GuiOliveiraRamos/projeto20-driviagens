import db from "../database/db.connection.js";

async function cityExistsByNameDB(name) {
    const result = await db.query('SELECT 1 FROM cities WHERE name = $1', [name]);
    return result.rows.length > 0;
}

async function addCityDB(name) {
    const query = 'INSERT INTO cities (name) VALUES ($1) RETURNING  *';
    const values = [name];
    const result = await db.query(query, values);
    console.log('City added:', result.rows[0]);
    return result.rows[0];
}


 async function cityExistsByIdDB(id) {
    const result = await db.query('SELECT 1 FROM cities WHERE id = $1', [id]);
    return result.rowCount > 0;
}

 async function flightExistsByOriginAndDestinationDB(origin, destination) {
    const result = await db.query('SELECT 1 FROM flights WHERE origin = $1 AND destination = $2', [origin, destination]);
    return result.rowCount > 0;
}

 async function addFlightDB(origin, destination, date) {
    const query = 'INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3) RETURNING *';
    const values = [origin, destination, date];
    const result = await db.query(query, values);
    return result.rows[0];
}


function getFlightsDB(origin, destination, smallerDate, biggerDate) {
    const query = `
        SELECT
            flights.id,
            cities_origin.name AS origin,
            cities_destination.name AS destination,
            flights.date
        FROM
            flights
        INNER JOIN
            cities AS cities_origin ON flights.origin = cities_origin.id
        INNER JOIN
            cities AS cities_destination ON flights.destination = cities_destination.id
        WHERE
            ($1::int IS NULL OR cities_origin.name = $1::text)
        AND
            ($2::int IS NULL OR cities_destination.name = $2::text)
        AND
            ($3::date IS NULL OR flights.date BETWEEN $3::date AND $4::date)
        ORDER BY
            flights.date;
    `;

    console.log('Executing getFlightsDB with params:', origin, destination, smallerDate, biggerDate);

    return db.query(query, [origin || null, destination || null, smallerDate, biggerDate]);
}



 async function passengerExistsByIdDB(passengerId) {
    const result = await db.query(`SELECT 1 FROM passengers WHERE id = $1`, [passengerId]);
    return result.rowCount > 0;
}

 async function flightExistsByIdDB(flightId) {
    const result = await db.query(`SELECT 1 FROM flights WHERE id = $1`, [flightId]);
    return result.rowCount > 0;
}

export async function insertNewTravel(passengerId, flightId) {
        const query = 'INSERT INTO travel (passengerId, flightId) VALUES ($1, $2) RETURNING *';
        const values = [passengerId, flightId];

        const result = await db.query(query, values);

        return result.rows[0].id;
    } 

 async function getTravelsPassengersDB(name) {
    let query = `
        SELECT
            CONCAT(p.firstName, ' ', p.lastName) AS passenger,
            COUNT(t.passengerId) AS travels
        FROM
            passengers p
        LEFT JOIN
            travel t ON p.id = t.passengerId
    `;

    const params = [];

    if (name) {
        query += `
            WHERE
                CONCAT(p.firstName, ' ', p.lastName) ILIKE $1
        `;
        params.push(`%${name}%`);
    }

    query += `
        GROUP BY
            passenger
        ORDER BY
            travels DESC
        LIMIT
            10;
    `;

    const { rows } = await db.query(query, params);
    return rows;
}

const flightsRepository = {
    cityExistsByNameDB,
    addCityDB,
    cityExistsByIdDB,
    flightExistsByOriginAndDestinationDB,
    addFlightDB,
    getFlightsDB,
    passengerExistsByIdDB,
    flightExistsByIdDB,
    insertNewTravel,
    getTravelsPassengersDB
}

export default flightsRepository
