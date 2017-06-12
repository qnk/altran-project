"use strict"

const _       = require('underscore')
const myError = require('../services/ErrorService')

module.exports = {
    get: (req, res, next) => {
        if(_.isUndefined(req.user))
            myError.withParams({ user: req.user })

        res.status(200).send(req.user)
    },

    getByName: (req, res, next) => {
        if(_.isUndefined(req.user))
            myError.withParams({ users: req.user })     

        res.status(200).send(req.user)
    },
    
    policyByNumber: (req, res, next) => {
        if(_.isUndefined(req.policy))
            myError.withParams({ policy: req.policy })

        res.status(200).send(req.policy)        
    }
}
