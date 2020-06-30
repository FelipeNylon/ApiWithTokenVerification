const {Router} = require('express');
const {Account} = require('../models')
const bcrypt = require('bcrypt')
const {accountSignUp} = require('../validators/account')
const saltRounds = 11

const router = Router()


router.get('/sign-in', (req, res) => {
    return res.jsonOk('Requisão feita com sucesso')
})



router.post('/sign-up', accountSignUp ,async (req, res) => {

    const {email,password} = req.body;
   
    const account =  await Account.findOne({where: {email}})
    if (account) return res.jsonBadRequest(null, 'A conta já existe')
        
    
    const hash = bcrypt.hashSync(password, saltRounds)
    //console.log(hash);
    
    const newAccount = await Account.create({email: email, password:hash})
    
    return res.jsonOk(newAccount, 'Conta Criada com sucesso');
})

module.exports = router