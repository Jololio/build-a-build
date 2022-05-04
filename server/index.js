require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const axios = require('axios').default
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const {loginUser} = require('./loginController')

app.use(express.json())
app.use(cors())

app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/js', (req, res) => {
    res.sendFile('./public/index.js', {root: __dirname})
})

app.get('/setup_db', (req, res) => {
    console.log('Seeding database...')
    seed(req,res)
})

app.get('/login/:username/:password', (req, res) => {
    console.log(`Logging in, ${req.params.username}`)
    loginUser(req,res)
})

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))