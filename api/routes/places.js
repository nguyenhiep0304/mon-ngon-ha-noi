const express = require('express')
const router = express.Router()
const { poolPromise, sql } = require('../db')

// Lấy danh sách places
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query('SELECT * FROM Places')
    res.json(result.recordset)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

// Thêm place
router.post('/', async (req, res) => {
  const { name, lat, lng, youtube } = req.body

  try {
    const pool = await poolPromise
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('lat', sql.Float, lat)
      .input('lng', sql.Float, lng)
      .input('youtube', sql.NVarChar, youtube)
      .query(`
        INSERT INTO Places (name, lat, lng, youtube)
        VALUES (@name, @lat, @lng, @youtube)
      `)

    res.status(201).send('Place added successfully!')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error saving data')
  }
})

module.exports = router
