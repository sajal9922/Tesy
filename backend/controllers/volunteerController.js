const pool = require('../utils/db')

const getAllEmployees = async (req, res) => {
    const result = await pool.query('SELECT * FROM public.people');
    res.json(result.rows);
}