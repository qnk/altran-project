"use strict"

/* TODO: Convert Role in controller and call service from there to mantain the same structure of the rest of the application*/
const Rol     = require("../services/RolService")
const myError = require("../services/ErrorService")
const errMsgs = require('../config/errors/en_EN')

module.exports = {
    isAdmin: (req, res, next) => {
        var user = req.user || next(new Error('Error with params'))

        if(! Rol.isAdmin(user)) next(myError.throw(errMsgs.FORBIDDEN))

        next()
    },

    isValid: (req, res, next) => {
        var user = req.user || next(new Error('Error with params'))
     
        if(! Rol.isValid(user)) next(myError.throw(errMsgs.INVALID_ROL))

        next()         
    },
}
