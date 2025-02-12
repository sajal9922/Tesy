// Connect to the database
// const { Pool } = require('pg')


// const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// })
// module.exports = db;

const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'tietokanta123',
  database: 'postgres',
  searchPath: ['s', 'public'],
});

module.exports = pool;