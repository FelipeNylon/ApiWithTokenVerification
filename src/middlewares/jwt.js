const {verifyJwt, getTokenFromHeaders} = require('../helpers/jwt')


const checkJwt = (req, res, next) => {

    const {url: path} = req
    

    const excludesPaths = ['/auth/sign-in' ,'/auth/sign-up','/auth/refresh']
    const isExcluded = !!excludesPaths.find(p=> p.startsWith(path))

    if(isExcluded) return next()

    console.log(path, isExcluded);



    const token = getTokenFromHeaders(req.headers)
    
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
