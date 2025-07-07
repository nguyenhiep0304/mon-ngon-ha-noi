const sql = require('mssql')
require('dotenv').config()

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  port: parseInt(process.env.SQL_PORT),
  options: {
    encrypt: false, // set true nếu chạy Azure
    trustServerCertificate: true
  }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ SQL Server connected!')
    return pool
  })
  .catch(err => console.log('❌ Database Connection Failed!', err))

module.exports = {
  sql, poolPromise
}
