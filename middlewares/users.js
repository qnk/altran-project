"use strict"

const Promise = require('bluebird')
const myError = require('../services/ErrorService')
const User    = require('../controllers/users')
const errMsgs = require('../config/errors/en_EN')
const INTERNAL_ERROR = errMsgs.INTERNAL_ERROR

module.exports = {
    get: (req, res, next) => {
        var userId = req.params.userId || next(new Error('Error with params'))

        Promise.coroutine(function*(userId) {
            var user = yield User.getOne(userId)

            if(user.length === 0) myError.throw({ message: 'User not found', status: 404 })

            return user
        })(userId)
        .then ((user) => {
            req.user = user
            next()   
        })
        .catch((ex)    => next(ex))
    },
    
    getByName: (req, res, next) => {
        var userName = req.params.userName || next(new Error('Error with params'))

        Promise.coroutine(function*(userName) {
            var user = yield User.getByName(userName)

            if(user.length === 0) myError.throw({ message: 'User not found', status: 404 })

            return user
        })(userName)
        .then ((user) => {
            req.user = user
            next()   
        })
        .catch((ex)    => next(ex))
    },
    
    getByPolicyNumber: (req, res, next) => {
        var policy   = req.policy          || next(myError.throw(INTERNAL_ERROR))
        ,   policyId = req.params.policyId || next(myError.throw(INTERNAL_ERROR))

        Promise.coroutine(function*(policy, policyId) {
            var usersByPolicyNumber = yield User.getByPolicyNumber(policy, policyId)

            return usersByPolicyNumber
        })(policy, policyId)
        .then ((userByPolicyNumber) => {
            req.user = userByPolicyNumber
            next()
        })
        .catch((ex) => next(ex))
    }
}
