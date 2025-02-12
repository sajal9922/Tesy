const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const getRolesList = require('../utils/roles_list');

router.get('/', async (req, res) => {
  const username = 'imnew';
  const result = await pool.query(
    'SELECT * FROM public.people WHERE username = $1',
    [username]
  );
  // get roles list
  const roles = await getRolesList();
  // get user info
  const user = result.rows[0];

  res.json({ roles: roles, result: user });
});

module.exports = router;
