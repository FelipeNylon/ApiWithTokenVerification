const {Router} = require('express');
const {Account} = require('../models')
const bcrypt = require('bcrypt')
const {accountSignUp, accountSignIn} = require('../validators/account')
const{generateJwt,generateRefreshJwt} = require('../helpers/jwt')
const saltRounds = 11

const router = Router()


router.post('/sign-in', accountSignIn, async (req, res) => {
    const {email,password} = req.body;
    const account =  await Account.findOne({where: {email}})
    


    //validação da senha 
    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if(!match) return res.jsonBadRequest(null, 'Email ou senha estão incorretos')

    const token = generateJwt({id: account.id})
    const refreshToken = generateRefreshJwt({id: account.id, version: account.jwtVersion })


    return res.jsonOk(account, null, {token,refreshToken})

})



router.post('/sign-up', accountSignUp ,async (req, res) => {

    const {email,password} = req.body;
   
    const account =  await Account.findOne({where: {email}})
    if (account) return res.jsonBadRequest(null, 'A conta já existe')
        
    
    const hash = bcrypt.hashSync(password, saltRounds)
   
    
    const newAccount = await Account.create({email: email, password:hash})
    
    const token = generateJwt({id: newAccount.id})
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion})
    return res.jsonOk(newAccount, 'Conta Criada com sucesso', {token, refreshToken});
})

module.exports = router