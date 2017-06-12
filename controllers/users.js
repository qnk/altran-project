"use strict"

const Q       = require("q")
const Promise = require("bluebird")
const User    = require('../services/UserService')
const myError        = require('../services/ErrorService')
const errMsgs        = require('../config/errors/en_EN')
const INTERNAL_ERROR = errMsgs.INTERNAL_ERROR

module.exports = {
    getOne: (userId) => {
        var deferred = Q.defer()
        
        Promise.coroutine(function*(userId) {
            var user = yield User.getOne(userId)
            
            return user
        })(userId)    
        .then ((users) => deferred.resolve(users))
        .catch((ex)    => myError .reject (INTERNAL_ERROR))

        return deferred.promise
    },
    
    getByName: (userName) => {
        var deferred = Q.defer()
        
        Promise.coroutine(function*(userName) {
            var users = yield User.byName(userName)

            return users
        })(userName)    
        .then ((users) => deferred.resolve(users))
        .catch((ex)    => myError .reject (INTERNAL_ERROR))
        
        return deferred.promise
    },
    
    getByPolicyNumber: (policy, userId) => {
        var deferred = Q.defer()
        
        Promise.coroutine(function*(policy, userId) {

            var policyResult = yield User.getByPolicyNumber(policy, userId)
            
            return policyResult
        })(policy, userId)    
        .then ((policy) => deferred.resolve(policy))
        .catch((ex)     => myError .reject (INTERNAL_ERROR))
        
        return deferred.promise
    },
}
