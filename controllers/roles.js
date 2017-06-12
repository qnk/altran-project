"use strict"

const Role = require('../services').roles

module.exports = {
    isAdmin: () => {
        Roles.isAdmin()
    },
}
