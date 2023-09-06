export async function newCity (req,res) {
    const {name} = req.body 
    try {
        const existingCity = await db.query(`SELECT * FROM cities WHERE name = $1`, [name]);
        if (existingCity.rows.length > 0) {
            res.status(409).json({ error: "Cidade já existe" });
        } else {
            const addCity = await db.query(`INSERT INTO cities (name) VALUES ($1) RETURNING *`, [name]);
            res.status(201).json(addCity.rows[0]);
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






