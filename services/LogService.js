const env       = process.env.NODE_ENV || 'development'
const logConfig = require('../config/app').log

module.exports = {
    /*
        Just log into console if logConfig flag is active andm, 
    */
    console: () => {
        return (env !== 'production' && logConfig.console)
    }
}
