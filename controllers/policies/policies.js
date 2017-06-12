"use strict"

const User = require('../../services').policies

module.exports = {
    userByName: () => {
        User.get()
    },
}
