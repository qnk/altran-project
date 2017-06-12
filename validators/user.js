const _           = require('underscore')
const myError     = require('../services/ErrorService')
const errMsgs     = require('../config/errors/en_EN')
const BAD_REQUEST = errMsgs.BAD_REQUEST_ERROR

module.exports = {
    id: (req, res, next) => {
        if(_.isUndefined(req.params.userId)) next(new Error('Error with params'))
        
        var regExp = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/
        
        regExp.test(req.params.userId)
            ? next()
            : next(myError.throw(BAD_REQUEST))
    },
    
    name: (req, res, next) => {
        if(_.isUndefined(req.params.userName)) next(new Error('Error with params'))
        
        var regExp = /^[A-Z][a-z]*$/
        
        regExp.test(req.params.userName)
            ? next()
            : next(myError.throw(BAD_REQUEST))
    }
}
