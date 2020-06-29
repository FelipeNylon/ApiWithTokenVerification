const express = require('express');
const authController = require('../src/controllers/auth')

const app = express()



app.use('/auth', authController)


app.get('/', (req, res) => {
    return res.json('API rodando')
})


app.listen(4001, () => {
    console.log('Server Rodando')
})