"use strict"

const _          = require('underscore')
const myError    = require('./ErrorService')
const Data       = require('./DataService')
const validRoles = require('../config/roles')

module.exports = {
    isAdmin: (user) => {
        if(! _.isObject(user) || ! _.has(user, 'role')) myError.withParams({user: user})
           
        return user.role === 'admin'
    },

    isValid: (user) => {
        if(! _.isObject(user) || ! _.has(user, 'role')) myError.withParams({user: user})
        
        return Data.includes(validRoles, user.role)
    },

}