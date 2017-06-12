const _           = require('underscore')
const myError     = require('../services/ErrorService')
const errMsgs     = require('../config/errors/en_EN')
const BAD_REQUEST = errMsgs.BAD_REQUEST_ERROR

module.exports = {
    number: (req, res, next) => {
            if(_.isUndefined(req.params.policyId)) next(new Error('Error with params'))

            var regExp = /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/

            regExp.test(req.params.policyId)
                ? next()
                : next(myError.throw(BAD_REQUEST))
    }
}
