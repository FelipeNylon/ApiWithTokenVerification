const express = require('express');
const authController = require('../src/controllers/auth')
const db = require('../src/models')

const app = express()



app.use('/auth', authController)


app.get('/', (req, res) => {
    return res.json('API rodando')
})


db.sequelize.sync().then( () => {
    app.listen(4001, () => {
        console.log('Server Rodando na porta 4001')
    })
})


