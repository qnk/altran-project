const express    = require('express')
const path       = require('path')
const cors       = require('cors')
const helmet     = require('helmet')
const bunyan     = require('bunyan')
const bodyParser = require('body-parser')
const session    = require('express-session')
const app        = express()
const Log        = require('./services/LogService')
const apiVersion = process.env.API_VERSION || 1

app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public2'))
/*
    Helmet library securizes the application from several security issues
*/
app.use(helmet())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false })) //x-www-form-urlenconded
app.enable('trust proxy')
app.use(session({
    secret:'1234567890QWERTY',
    resave: true,
    saveUninitialized: true,
    cookie: {
        domain: '',
        secure: false,
        httpOnly: false
    }
}))
app.use(cors({
    origin: false,
    credentials: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin' , "*")
    res.header('Access-Control-Allow-Methods', 'GET')

    next();
})

const infoError = bunyan.createLogger({
    "name": "info",
    "streams": [{
        "level": "info",
        "path": `./logs/api-info.log`
    }]
})

app.use((req, res, next) => {
    infoError.info(`[REQUEST] ${req.protocol} to ${req.originalUrl} from ${req.ip}`)

    next()
})

// *** Endpoints ***
const users    = require('./routes/user')
const policies = require('./routes/policy')

app.use(`/v${apiVersion}/users/`   , users)
app.use(`/v${apiVersion}/policies/`, policies)
// ***

app.use((req, res, next) => {
    if(Log.console()) console.log(`Request from ${req.ip} - ${req.method} to ${req.originalUrl}`)
    var err = new Error('Endpoint not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    if(Log.console()) console.log(`*** ${err} ***`, `*** ${err.stack}`)

    res.status(err.status || 500).send({
        message: err.message || 'Undefined error',
    })
})

listen()

function listen() {
    const port = app.get('port');
    const env  = app.get('env');

    // if (env !== 'production') port = 3005

    app.listen(port)
    console.log(`\n***********\nAPI started on port ${port}. Env is ${env}\n`)
}

module.exports = app
