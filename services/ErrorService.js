"use strict"

const _        = require('underscore')
const bunyan   = require('bunyan')
const Log      = require('./LogService')
const logError = bunyan.createLogger({
    "name": "errors",
    "streams": [{
        "level": "error",
        "path": `./logs/api-error.log`
    }]
})

function buildError(errConst) {
    if(! _.isObject(errConst) || ! _.has(errConst, 'status') || ! _.has(errConst, 'message')) {
        console.log('Error with params', `errConst: ${errConst}`)
        throw Error('Error with params')
    }    
    
    var err     = new Error()
    err.message = errConst.message || 'There was an unexpected error.'
    err.status  = errConst.status  || 500
    
    return err
}

module.exports = {
    /*
        throw function for sync errors
    */
    throw: (errConst) => {
        var err = buildError(errConst)
        logError.error(err)

        throw err
    },

    /*
        throw function for async errors
    */
    reject: (errConst) => {
        var err = buildError(errConst)
        logError.error(err)

        return err
    },
    
    /*
        Internal error (code erro) when a function receives a wrong parameter 
    */
    withParams: (params) => {
        console.log('Error with params')
    
        if(! _.isObject(params)) {
            if(Log.console()) console.log(`params: ${params}`)
            throw Error('Error with params')
        }
    
        if(Log.console())
            _.each(params, (value, key) => console.log(`${key}: ${value}`))
        
        throw Error('Error with params')
    }
}
