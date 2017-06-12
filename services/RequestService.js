const Q       = require('q')
const _       = require('underscore')
const request = require('request')
const myError = require('./ErrorService')
const errMsgs = require('../config/errors/en_EN')
const host    = require('../config/app').url.host
const REQUEST_ERROR  = errMsgs.REQUEST_ERROR
const INTERNAL_ERROR = errMsgs.INTERNAL_ERROR
const webserviceHost = "http://www.mocky.io/v2/"

var self = {
    get: (path) => {
        var deferred = Q.defer()
        
        if(path.startsWith("http")) (myError.reject(INTERNAL_ERROR))

        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            uri: webserviceHost + path,
            method: 'GET'
        }, (err, res, body) => {
            if(err) deferred.reject (myError.reject(REQUEST_ERROR))
            else    {
                if(_.isEmpty(body) || _.isUndefined(body)) deferred.reject (myError.reject(REQUEST_ERROR))
                else                                       deferred.resolve(JSON   .parse (body))
            }
        })
    
        return deferred.promise
    },
    
    // user: () => {
    //     var deferred = Q.defer()
        
    //     self.get(USERS_URL)
    //     .then((users) => {
    //         // TODO: CREATE WARNING LOG!
    //         // if(user.length > 1) log.warning()
    //         if(users.length == 0) deferred.resolve([])
    //         else                  deferred.resolve(users[0])
    //     })
    //     .catch((ex)       => {
    //         console.log(ex)
    //         deferred.reject(new Error('Internal error'))
    //     })
        
    //     return deferred.promise
    // }
    
    // policies: () => {
    //     var deferred = Q.defer()
        
    //     self.get(POLICIES_URL)
    //     .then ((policies) => deferred.resolve(policies))
    //     .catch((ex)       => {
    //         console.log(ex)
    //         deferred.reject(new Error('Internal error'))
    //     })
        
    //     return deferred.promise
    // }
}

module.exports = self
