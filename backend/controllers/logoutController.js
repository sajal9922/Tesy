const pool = require('../db'); // adjust the path to your db.js file
const path = require('path');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    // Are we using cookies?
    // const cookies = req.cookies;
    // if (!cookies?.jwt) return res.sendStatus(204); //No content
    // const refreshToken = cookies.jwt;

    const localStore = localStorage.removeItem('accessToken');
    if (!localStore) return res.sendStatus(204); //No content

    const localStore2 = localStorage.removeItem('refreshToken');
    if (!localStore2) return res.sendStatus(204); //No content


    // Is refreshToken in db?
    const foundUser = (await pool.query('SELECT * FROM people WHERE refreshToken = $1', [refreshToken])).rows[0];
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    await pool.query('UPDATE people SET refreshToken = $1 WHERE id = $2', ['', foundUser.id]);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }