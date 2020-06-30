const messages = require('../config/messages.json')


const getMessages = (path) => {
    return messages[path] || null;
}

const getValidatorError = (error, messagesPath) => {
    if (!error) return null;

    const erroMessages = {}
    error.details.map((details) => {
        
    const message = details.message
    const type = details.type 
    const key = error.details[0].context.key 
    
        
    const path = `${messagesPath}.${key}.${type}`
    erroMessages[key] = getMessages(path) || message
   
    }) 

    return erroMessages;


}

module.exports = {
    getValidatorError
}