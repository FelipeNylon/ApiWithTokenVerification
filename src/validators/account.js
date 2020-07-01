const joi = require('@hapi/joi');
const Joi = require('@hapi/joi');
const {getValidatorError} = require('../helpers/validators')

const rules = {
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password_Confirmation: Joi.string().valid(Joi.ref('password')).required()
        
}
const options = {abortEarl: false}

const accountSignIn = (req, res, next) => {
    const {email, password} = req.body
    
    const schema = Joi.object({
        email: rules.email,
        password: rules.password
        
    })
    const options = {abortEarl: false}
    const {error} = schema.validate({email, password}, options);
    if (error) {
       const messages =  getValidatorError(error)
        return res.jsonBadRequest(null, null, {error:messages});
    }
    
    next();
}


const accountSignUp = (req, res, next) => {
    const {email, password, password_Confirmation} = req.body
    
    const schema = Joi.object({
        email: rules.email,
        password: rules.password,
        password_Confirmation: rules.password_Confirmation
    })
   
    const {error} = schema.validate({email, password, password_Confirmation}, options);
    if (error) {
       const messages =  getValidatorError(error ,'account.signUp')
        return res.jsonBadRequest(null, null, {error:messages});
    }
    
    next();
}

module.exports = {
    accountSignUp,
    accountSignIn
}