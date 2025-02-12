const express = require('express');
const db = require('../utils/db');
const getAllRouter = express.Router();

getAllRouter.get('/all', async (_, res) => {
    let client;
    try {
      client = await db.connect();
      const result = await client.query(`
        SELECT table_name, column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position
      `);
      
      // Grouping columns by table name
      const tables = {};
      result.rows.forEach(row => {
        if (!tables[row.table_name]) {
          tables[row.table_name] = [];
        }
        tables[row.table_name].push(row.column_name);
      });
  
      res.json(tables);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    } finally {
      // Ensure the client is released back to the pool even in case of error
      if (client) {
        client.release();
      }
    }
});

module.exports = getAllRouter;