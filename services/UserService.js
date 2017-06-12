"use strict"

const Q       = require('q')
const Promise = require('bluebird')
const _       = require('underscore')
const Request = require('./RequestService')
const myError = require('../services/ErrorService')
const Data    = require('../services/DataService')
const errMsgs = require('../config/errors/en_EN')
const INTERNAL_ERROR = errMsgs.INTERNAL_ERROR
const USERS_PATH      = '5808862710000087232b75ac'
const POLICIES_PATH   = '580891a4100000e8242b75c5'

var self = {
    getOne: (userId) => {
        var deferred = Q.defer()
        
        Request.get(USERS_PATH)
        .then ((users) => {
            var usersById = users.clients.filter((client) => client.id === userId.toString())
            
            deferred.resolve(Data.returnBasedOnLength(usersById))
        })
        .catch((ex) => deferred.reject(myError.reject(INTERNAL_ERROR)))
        
        return deferred.promise
    },
    
    byName: (userName) => {
        var deferred = Q.defer()
        
        Request.get(USERS_PATH)
        .then ((users) => {
            var  usersByName = users.clients.filter((client) => client.name === userName.toString())

            deferred.resolve(Data.returnBasedOnLength(usersByName))
        })
        .catch((ex) => deferred.reject(myError.reject(INTERNAL_ERROR)))
        
        return deferred.promise
    },
    
    getByPolicyNumber: (policy, userId) => {
        var deferred = Q.defer()

        if(! _.isObject(policy) || ! _.isString(userId)) myError.reject(INTERNAL_ERROR)

        Promise.coroutine(function*(policy, userId) {
            var user = yield self.getOne (policy.clientId)
            
            return user
        })(policy, userId)
        .then ((user) => deferred.resolve(user))
        .catch((ex)       => myError .reject (INTERNAL_ERROR))
        
        return deferred.promise        
    }
}

module.exports = self
