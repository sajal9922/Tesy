// Desc: Middleware to verify if the user has the required roles to access the route
const pool = require('../utils/db');

const verifyRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = await pool.query('SELECT * FROM roles WHERE role_name = ANY($1)', [req.roles]);
        const hasAllowedRole = result.rows.some(role => rolesArray.includes(role.role_name));
        if (!hasAllowedRole) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles