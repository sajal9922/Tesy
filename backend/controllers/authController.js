const pool = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// need the username, password and newPassword
const activateUser = async (req, res) => {
  const { username, password, newPassword } = req.body;
  if (!username || !password || !newPassword)
    return res.status(400).json({
      message: 'Username, current password, and new password are required.',
    });

  // Query the database for the user
  const result = await pool.query(
    'SELECT * FROM public.people WHERE username = $1',
    [username]
  );

  const user = result.rows[0];
  if (!user) return res.sendStatus(401); //Unauthorized

  // Check if the current password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(403).json({ message: 'Current password is incorrect.' });

  // Check if the user is active
  if (user.active === null) {
    // do something
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password and set them as active
  await pool.query(
    'UPDATE public.people SET password = $1, active = null WHERE username = $2',
    [hashedPassword, username]
  );

  // Create JWTs
  const accessToken = jwt.sign(
    { UserInfo: { username: user.username } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '60s' }
  );
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  // Send the JWTs to the client
  res.json({ accessToken, refreshToken });
};

// POST http://localhost:5001/login
// Content-Type: application/json

// {
//   "username": "admin",
//   "password": "admin"
// }

// // need the username
// const handleLogin = (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res
//       .status(400)
//       .json({ message: 'Username and password are required.' });

//   // Call validate_user_and_get_roles function to verify the user's credentials and get their roles
//   pool
//     .query('SELECT * FROM validate_user_and_get_roles($1, $2)', [
//       username,
//       password,
//     ])
//     .then((result) => {
//       const { authenticated, roles } = result.rows[0];
//       if (!authenticated) {
//         res.sendStatus(401); // Unauthorized
//       } else {
//         // Generate access token
//         const accessToken = jwt.sign(
//           { username, roles },
//           process.env.ACCESS_TOKEN_SECRET,
//           { expiresIn: '1h' }
//         );

//         // Get user id from pweople table from database
//         pool
//           .query('SELECT id FROM public.people WHERE username = $1', [username])
//           .then((result) => {
//             const { id } = result.rows[0];
//             console.log('userId object;', id);
//           });
//         // console.log('userId:', id);
//         // // Secret key used to sign the token
//         const secretKey = process.env.ACCESS_TOKEN_SECRET;

//         // Decode the JWT token
//         jwt.verify(accessToken, secretKey, (err, decoded) => {
//           if (err) {
//             // Token verification failed
//             console.error('JWT verification failed:', err.message);
//           } else {
//             // Token verification succeeded
//             console.log('Decoded token:', decoded);
//             // You can access the decoded payload properties here
//             console.log('Username:', decoded.username);
//             const { username, roles } = decoded;
//             res.json({ accessToken, username, roles });
//             console.log('id ', id);
//             // Access other properties as needed
//           }
//         });

//         // Send the access token to the client
//         // res.json({ accessToken });
//       }
//     })
//     .catch((error) => {
//       console.error('Error during login:', error.message);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// };

// Login endpoint
const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  try {
    // Call validate_user_and_get_roles function to verify the user's credentials and get their roles
    const result = await pool.query(
      'SELECT * FROM validate_user_and_get_roles($1, $2)',
      [username, password]
    );

    const { authenticated, roles } = result.rows[0];
    if (!authenticated) {
      return res.sendStatus(401); // Unauthorized
    }

    // Generate access token
    const accessToken = jwt.sign(
      { username, roles },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );

    // Get user id from people table
    const idResult = await pool.query(
      'SELECT id FROM public.people WHERE username = $1',
      [username]
    );
    const { id } = idResult.rows[0];

    // Decode the JWT token for verification
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(403).json({ message: 'JWT verification failed.' });
      } else {
        console.log('Decoded token:', decoded);
        res.json({ accessToken, username, roles, userId: id });
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { activateUser, handleLogin };
