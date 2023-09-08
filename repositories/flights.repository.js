export async function cityExistsByNameDB(name) {
    const result = await db.query('SELECT 1 FROM cities WHERE name = $1', [name]);
    return result.rows.length > 0;
}

export async function addCityDB(name) {
    const query = 'INSERT INTO cities (name) VALUES ($1) RETURNING *';
    const values = [name];
    const result = await db.query(query, values);
    return result.rows[0];
}

export async function cityExistsByIdDB(id) {
    const result = await db.query('SELECT 1 FROM cities WHERE id = $1', [id]);
    return result.rowCount > 0;
}

export async function flightExistsByOriginAndDestinationDB(origin, destination) {
    const result = await db.query('SELECT 1 FROM flights WHERE origin = $1 AND destination = $2', [origin, destination]);
    return result.rowCount > 0;
}

export async function addFlightDB(origin, destination, date) {
    const query = 'INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3) RETURNING *';
    const values = [origin, destination, date];
    const result = await db.query(query, values);
    return result.rows[0];
}


export function getFlightsDB(origin, destination, smallerDate, biggerDate) {
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
            ($1 IS NULL OR cities_origin.name = $1)
        AND
            ($2 IS NULL OR cities_destination.name = $2)
        AND
            ($3 IS NULL OR flights.date BETWEEN $3 AND $4)
        ORDER BY
            flights.date;
    `;

    return db.query(query, [origin || null, destination || null, smallerDate, biggerDate]);
}

export async function getTravelsPassengersDB(name) {
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

