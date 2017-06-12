const express = require('express')
const router  = express.Router()

const Validate  = require('../validators')
const User      = require('../middlewares').users
const Policy    = require('../middlewares').policies
const Auth      = require('../middlewares').auth
const Send      = require('../senders')

router.get(`/users/name/:userName`
    ,   Validate.user.name
    ,   User.getByName
    ,   Auth.isAdmin   
    ,   Policy.getByUserId
    ,   Send.policies.getByUserName
)

module.exports = router
