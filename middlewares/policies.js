"use strict"

const _       = require('underscore')
const Promise = require('bluebird')
const Policy  = require('../controllers/policies')
const myError = require('../services/ErrorService')
const errMsgs = require('../config/errors/en_EN')
const INTERNAL_ERROR = errMsgs.INTERNAL_ERROR

module.exports = {
    // TODO: verify if this middleware is being used or not
    find: (req, res, next) => {
        var policyId = req.params.policyId || next(myError.throw(INTERNAL_ERROR))

        Policy.get(policyId)
        .then ((policy) => {
            if(_.isUndefined(policy)) next(myError.throw(INTERNAL_ERROR))
            if(policy.length === 0) myError.throw({ message: 'Policy not found', status: 404 })
            
            req.policy = policy
            next()
        })
        .catch((ex) => next(ex))
    },
    
    getByUserId: (req, res, next) => {
        // var userName = req.params.userName || next(myError.reject(INTERNAL_ERROR))
        var user = req.user || next(myError.reject(INTERNAL_ERROR))

        Promise.coroutine(function*(user) {        
            var policies = yield Policy.getByUserId(user)
            
            return policies
        })(user)    
        .then ((policies) => {
            req.policies = policies
            
            next()
        })
        .catch((ex)       => myError.reject(INTERNAL_ERROR))
    },
}
