"use strict"

const _       = require('underscore')
const myError = require('../services/ErrorService')

module.exports = {
    getByUserName: (req, res, next) => {
        if(_.isUndefined(req.policies))
            myError.withParams({ policies: req.policies })

        res.status(200).send(req.policies)
    }
}
