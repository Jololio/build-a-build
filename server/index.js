require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios').default
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')

app.use(express.json())
app.use(cors())

app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/js', (req, res) => {
    res.sendFile('./public/index.js', {root: __dirname})
})

app.get('/setup_db', (req, res) => {
    console.log('Seeding databse...')
    seed()
    return res.status(200).send('DB has seeded successfully!')
})

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))