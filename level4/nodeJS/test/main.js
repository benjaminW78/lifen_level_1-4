const Should = require('should')

const Module = require('../main')

describe('Level 4', function () {
    before(() =>new Promise((resolve => setTimeout(resolve,1000)))    )
    it('should match original output file', function () {
        const generatedOutput = require('../dir/output')
        const originalOutput = require('../../output')
        Should(generatedOutput).be.containEql(originalOutput)
    })
})