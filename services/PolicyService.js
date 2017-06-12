"use strict"

const Q              = require('q')
const _              = require('underscore')
const Promise        = require('bluebird')
const myError        = require('./ErrorService')
const Data           = require('./DataService')
const Request        = require('./RequestService')
const errMsgs        = require('../config/errors/en_EN')
const INTERNAL_ERROR = errMsgs.INTERNAL_ERROR
const POLICIES_PATH  = '580891a4100000e8242b75c5'
const USERS_PATH     = '5808862710000087232b75ac'

// var self = {
module.exports = {
    get: (policyNumber) => {
        var deferred = Q.defer()
        
        Request.get(POLICIES_PATH)
        .then ((policies) => {
            var policy = policies.policies.filter((policy) => policy.id === policyNumber.toString())

            return Data.returnBasedOnLength(policy)
        })
        .then ((policies) => deferred.resolve(policies))
        .catch((ex)       => deferred.reject (myError.reject(INTERNAL_ERROR)))
        
        return deferred.promise        
    },
    
    getByUserId: (clientId) => {
        var deferred = Q.defer()
        
        Promise.coroutine(function*(clientId) {
            var policies = yield Request .get            (POLICIES_PATH)
            ,   policy   =       policies.policies.filter((policy) => {
                    return policy.clientId.toString() === clientId.toString()
                })

            return policy
        })(clientId)    
        .then ((policies) => deferred.resolve(policies))
        .catch((ex)       => myError .reject (INTERNAL_ERROR))
        
        return deferred.promise
    },
}
