const pool = require('../utils/db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// POST http://localhost:5001/register
// Content-Type: application/json

// {
//   "username": "imnew",
//   "password": "password123",
//   "realname": "Real Name",
//   "email": "newuser@email.com"
// }

// new user for administrators to create new users (1 is the role_id for administrators)
const handleNewUser = async (req, res) => {
  const { role, username, realname, email, password } = req.body;
  console.log(req.body);
  if (!username || !realname || !email)
    return res
      .status(400)
      .json({ message: 'Username, real name, and email are required.' });
  // Generate a random password
  //   const passwd = Math.random().toString(36).slice(-6);
  // check for duplicate usernames in the db
  const duplicateQuery = 'SELECT * FROM public.people WHERE "username" = $1';
  const duplicate = await pool.query(duplicateQuery, [username]);
  if (duplicate.rows.length > 0) return res.sendStatus(409); //Conflict

  try {
    // Hash the password if you want to store it securely and impossible to write
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(passwd, saltRounds);

    //store the new user
    const insertQuery = `
            INSERT INTO public.people ("role_id", "username", "passwd", "realname", "email")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
    const result = await pool.query(insertQuery, [
      role,
      username,
      password,
      realname,
      email,
    ]);
    const peopleId = result.rows[0].id;

    // Use the id of the new person to insert a record into the people_role table
    await pool.query(
      `INSERT INTO public.people_role ("people_id", "role_id")
            VALUES ($1, $2)`,
      [peopleId, role]
    );

    res.sendStatus(201); // Created
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Server error
  }
};

module.exports = { handleNewUser };
