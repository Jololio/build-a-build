require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const axios = require('axios').default
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const {loginUser} = require('./loginController')
const sequelize = require('./database.js')
const {getUserBuilds} = require('./controller')

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

app.get('/champions', (req, res) => {
    sequelize.query(`
        SELECT *
        FROM bab_champions
    `).then(dbRes => {
        res.status(200).send(dbRes[0])
    })
})

app.get('/items', (req, res) => {
    sequelize.query(`
        SELECT *
        FROM bab_items
    `).then(dbRes => {
        res.status(200).send(dbRes[0])
    })
})

app.post('/create-build', (req, res) => {
    sequelize.query(`
        INSERT INTO bab_builds (build_name, user_id, champion_id, item_1, item_2, item_3, item_4, item_5, item_6)
        VALUES('${req.body.buildName}', '${req.body.userId}', ${req.body.champion}, ${req.body.items[0]}, ${req.body.items[1]}, ${req.body.items[2]}, ${req.body.items[3]}, ${req.body.items[4]}, ${req.body.items[5]})   
    `)
})

// getUserBuilds()

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))