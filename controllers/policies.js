"use strict"

const Q       = require('q')
const _       = require('underscore')
const Promise = require('bluebird')
const Policy  = require('../services/PolicyService')
const myError = require('../services/ErrorService')
const errMsgs = require('../config/errors/en_EN')

module.exports = {
    getByUserId: (user) => {
        var deferred = Q.defer()
        
        if(! _.isObject(user) || _.isEmpty(user)) deferred.reject(myError.reject(errMsgs.INTERNAL_ERROR))

        Promise.coroutine(function*(userId) {  
            var policies = Policy.getByUserId(userId)
            
            return policies
        })(user.id)    
        .then ((users) => deferred.resolve(users))
        .catch((ex)    => deferred.reject (ex))
        
        return deferred.promise
    },
    
    get: (policyNumber) => {
        var deferred = Q.defer()

        if(! _.isString(policyNumber) || policyNumber === '') deferred.reject(myError.reject(errMsgs.INTERNAL_ERROR))

        Policy.get(policyNumber)
        .then ((policies) => deferred.resolve(policies))
        .catch((ex)       => deferred.reject (ex))
        
        return deferred.promise        
    }
}
