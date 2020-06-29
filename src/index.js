const express = require('express');


const app = express()


app.get('/', (req, res) => {
    return res.json('API rodando')
})


app.listen(4001, () => {
    console.log('Server Rodando')
})