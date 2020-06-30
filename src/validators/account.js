const joi = require('@hapi/joi');
const Joi = require('@hapi/joi');
const {getValidatorError} = require('../helpers/validators')






const accountSignUp = (req, res, next) => {
    const {email, password, passwordConfirmation} = req.body
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        passwordConfirmation: Joi.string().valid(Joi.ref('password')).required()
    })
    const options = {abortEarl: false}
    const {error} = schema.validate({email, password, passwordConfirmation}, options);
    if (error) {
       const messages =  getValidatorError(error ,'account.signUp')
        return res.jsonBadRequest(null, null, {error:messages});
    }
    
    next();
}

module.exports = {
    accountSignUp
}