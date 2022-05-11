require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const axios = require('axios').default
const {PORT} = process.env
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
    if(req.query.item_1){
        let {item_1, item_2, item_3, item_4, item_5, item_6} = req.query
        sequelize.query(`
            SELECT *
            FROM bab_items
            WHERE item_id IN (${item_1}, ${item_2}, ${item_3}, ${item_4}, ${item_5}, ${item_6});
        `).then(dbRes => {
            console.log(dbRes[0])
            const sortedItems = Object.values(req.query).map(item =>{
                return dbRes[0].find(i => i.item_id == item)
            })
            res.status(200).send(sortedItems)
        })
    } else {
        sequelize.query(`
        SELECT *
        FROM bab_items
        `).then(dbRes => {
            console.log(dbRes[0])
        res.status(200).send(dbRes[0])
        })
    }
})

app.post('/create-build', (req, res) => {
    sequelize.query(`
        INSERT INTO bab_builds (build_name, user_id, champion_id, item_1, item_2, item_3, item_4, item_5, item_6)
        VALUES('${req.body.buildName}', '${req.body.userId}', ${req.body.champion}, ${req.body.items[0]}, ${req.body.items[1]}, ${req.body.items[2]}, ${req.body.items[3]}, ${req.body.items[4]}, ${req.body.items[5]})   
    `).then(dbRes => {
        res.status(200).send(dbRes[0])
    })
})

app.delete(`/delete-build/:buildId`, (req, res) => {
    sequelize.query(`
        DELETE FROM bab_builds
        WHERE build_id = ${req.params.buildId}
    `).then(dbRes => {
        res.status(200).send(dbRes[0])
    })
})

app.put(`/edit-build`, (req,res) => {
    sequelize.query(`
        UPDATE bab_builds
        SET build_name = '${req.body.buildName}', champion_id = ${req.body.champion}, item_1 = ${req.body.items[0]}, item_2 = ${req.body.items[1]}, item_3 = ${req.body.items[2]}, item_4 = ${req.body.items[3]}, item_5 = ${req.body.items[4]}, item_6 = ${req.body.items[5]}
        WHERE build_id = ${req.body.buildId} 
    `).then(dbRes => {
        res.status(200).send(dbRes[0])
    })
})

app.get('/builds', getUserBuilds)

app.listen(PORT, () => console.log(`up on ${PORT}`))