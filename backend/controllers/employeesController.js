// db connection
const pool = require('../utils/db')

// Need username
const getAllEmployees = (req, res) => {
    const { creator_usr } = req.query;
    pool.query('SELECT * FROM get_all_users_roles($1)', [creator_usr])
        .then(result => {
            const users = result.rows.reduce((acc, row) => {
                if (!acc[row.username]) {
                    acc[row.username] = {
                        username: row.username,
                        roles: [],
                    };
                }
                acc[row.username].roles.push(row.role_name);
                return acc;
            }, {});

            // Convert the users object to an array
            const usersArray = Object.values(users);

            res.json(usersArray);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching roles' });
        });
};

const createNewEmployee = (req, res) => {
    const { username, password, realname, email } = req.body;
    pool.query('SELECT * FROM create_new_employee($1, $2, $3, $4)', [username, password, realname, email])
        .then(result => {
            res.status(201).json(result.rows[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while creating the employee' });
        });
};

const updateEmployee = (req, res) => {
    const { id, role_id, username, password, realname, email } = req.body;
    pool.query('SELECT * FROM update_employee($1, $2, $3, $4, $5, $6)', [id, role_id, username, password, realname, email])
        .then(result => {
            if (result.rowCount === 0) {
                return res.status(400).json({ "message": `People ID ${id} not found` });
            }
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating the employee' });
        });
};

const deleteEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM delete_employee($1)', [id])
        .then(result => {
            if (result.rowCount === 0) {
                return res.status(400).json({ "message": `People ID ${id} not found` });
            }
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while deleting the employee' });
        });
};

const getEmployeeRoles = (req, res) => {
    pool.query('SELECT * FROM get_user_roles()')
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching roles' });
        });
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeRoles
}