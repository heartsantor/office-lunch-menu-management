require('dotenv').config();

module.exports = {
  databaseUrl: process.env.POSTGRES_URL,
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  count: Infinity,
  timestamp: false,
  log: console.log,
};