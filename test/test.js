const assert = require('assert')
const Data   = require('../services/DataService')

describe('DataService', function() {
    describe('#includes([], "1")', function() {
        it('should return false', function() {
            assert.equal(false, Data.includes([], "1"))
        })
    })
    
    describe('#includes(["admin", "user"], "user")', function() {
        it('should return true', function() {
            assert.equal(true, Data.includes(["admin", "user"], "user"))
        })
    })
    
    describe('#includes("admin", "admin")', function() {
        it('should return "Error with params"', function() {
            assert.throws(
                function() { Data.includes('admin', 'admin') }
            ,   Error
            ,   "Error with params")
        })
    })
    
    describe('#includes("admin")', function() {
        it('should return "Error with params"', function() {
            assert.throws(
                function() { Data.includes(['admin']) }
            ,   Error
            ,   "Error with params")
        })
    })
})