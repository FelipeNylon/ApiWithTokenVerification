const {Router} = require('express');
const {Account} = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 11

const router = Router()


router.get('/sign-in', (req, res) => {


    return res.json('sign-in')
})



router.post('/sign-up', async (req, res) => {

    const {email,password} = req.body;
   
    const account =  await Account.findOne({where: {email}})
    if (account) return res.jsonBadRequest(null, 'A conta já existe')
        
    
    const hash = bcrypt.hashSync(password, saltRounds)
    //console.log(hash);
    
    const newAccount = await Account.create({email: email, password:hash})
    
    return res.jsonOk(newAccount, 'Conta Criada com sucesso');
})

module.exports = router