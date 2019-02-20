const Should = require('should')

const Module = require('../main')

describe('Level 1', function () {
    it('should match original output file', function () {
        const generatedOutput = require('../dir/output')
        const originalOutput = require('../../output')
        Should(generatedOutput).be.containEql(originalOutput)
    })
})