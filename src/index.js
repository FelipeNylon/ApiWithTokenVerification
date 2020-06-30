const express = require('express');
const authController = require('../src/controllers/auth')
const db = require('../src/models')
const response = require('./middlewares/response')
const app = express()



app.use(response);
app.use(express.json())
app.use(express.urlencoded(({extended: false})))
app.use('/auth', authController)


app.get('/', (req, res) => {
    return res.json('API rodando')
})


db.sequelize.sync().then( () => {
    app.listen(4001, () => {
        console.log('Server Rodando na porta 4001')
    })
})


