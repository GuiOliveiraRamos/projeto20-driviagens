export async function newPassenger (req,res) {
 const {firstName, lastName} = req.body 
 try{
  const passenger = await db.query(`INSERT INTO passengers (firstName, lastName) VALUES ($1, $2)`, [firstName, lastName])
  res.status(201).json(passenger.rows[0])
 }catch (err){
  res.status(500).send(err.message)
 }
}