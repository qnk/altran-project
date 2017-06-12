const express = require('express')
const router  = express.Router()

const Validate   = require('../validators')
const User       = require('../middlewares').users
const Policy     = require('../middlewares').policies
const Auth       = require('../middlewares').auth
const Send       = require('../senders')

router.get(`/:userId`
    ,   Validate.user.id
    ,   User.get
    ,   Auth.isValid
    ,   Send.user.get
)

router.get(`/name/:userName`
    ,   Validate.user.name
    ,   User.getByName
    ,   Auth.isValid    
    ,   Send.user.getByName
)

router.get(`/policies/:policyId`
    ,   Validate.policy.number
    ,   Policy.find
    ,   User  .getByPolicyNumber
    ,   Auth  .isAdmin
    ,   Send.user.policyByNumber
)

module.exports = router
