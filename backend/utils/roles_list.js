const pool = require('./db');

const getRolesList = async () => {
    const result = await pool.query('SELECT * from public.role;');
    const roles = {};
    result.rows.forEach(row => {
      roles[row.name] = row.id;
    });
    return roles;
  };

module.exports = getRolesList;

// const ROLES_LIST = {
    //     "Admin": 1,
    //     "Volunteer": 2,
    //     "Editor": 3,
    //     "User": 4,
    //     "Mayor": 5
// }
