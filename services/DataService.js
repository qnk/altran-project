const _       = require('underscore')
const myError = require('./ErrorService')

module.exports = {
    includes: (arr, value) => {
        if(! _.isArray(arr) || _.isUndefined(value)) myError.withParams({arr: arr})

        var index = _.indexOf(arr, value)

        return parseInt(index) !== -1
    },
    
    //
    returnBasedOnLength: (results) => {
        if(! _.isArray(results)) myError.withParams({results: results})
        
        // TODO: CREATE WARNING LOG!
        // if(results.length > 1) log.warning()
    
        if(results.length === 0) return []
    
        return results[0]
    },
}
