require('dotenv').config()


const DB_HOST = process.env.DB_HOST
const DB_DIALECT = process.env.DB_DIALECT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PORT = process.env.DB_PORT
const DB_PASSWORD = process.env.DB_PASSWORD
const DATABASE_URL = process.env.DATABASE_URL
const SERVER_PORT = process.env.SERVER_PORT
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

module.exports = {
  DB_HOST,
  DB_DIALECT,
  DB_NAME,
  DB_USER,
  DB_PORT,
  DB_PASSWORD,
  DATABASE_URL,
  SERVER_PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
}