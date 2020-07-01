const {verifyJwt} = require('../helpers/jwt')


const checkJwt = (req, res, next) => {

    let token = req.headers['authorization']
    console.log(req.headers)
    token = token ? token.slice(7, token.length) :null;
    if(!token) {
       return res.jsonUnauthorized(null, 'invalid Token')
    }
    try {
        const decoded = verifyJwt(token)
        req.accountId = decoded.id 
        console.log('Decoded', decoded)
        next()
    } catch (error) {
        return res.jsonUnauthorized(null, 'invalid Token')
    }
   

    

};




module.exports = checkJwt;
