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






