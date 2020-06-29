const {Router} = require('express');
const {Account} = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 11
const router = Router()


router.get('/sign-in', (req, res) => {


    return res.json('sign-in')
})



router.get('/sign-up', async (req, res) => {

    const email = 'felipeAdm@gmail.com';
    const password = '666';


    const hash = bcrypt.hashSync(password, saltRounds)
    console.log(hash);
    
    const response = await Account.create({email: email, password:hash})
    console.log(response)
    return res.json(response)
})

module.exports = router