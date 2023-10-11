import db from "../database/db.connection.js";

async function addPassengerDB(firstName, lastName) {
    const query = 'INSERT INTO passengers (firstName, lastName) VALUES ($1, $2) RETURNING *';
    const values = [firstName, lastName];
  
    try {
      const result = await db.query(query, values);
      const newPassenger = result.rows[0];
      return newPassenger;
    } catch (err) {
      throw err;
    }
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

const passengersRepository = {
    addPassengerDB,
    getTravelsPassengersDB
}

export default passengersRepository