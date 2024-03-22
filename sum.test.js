const sum = require('./sum.js')

// Business has given us requirements to write a math module that sums. Divides, multiplies and subtracts.

// describe test expect
describe("Math Module Test", ()=>{
    test("As a user I want to sum 2 numbers", ()=>{
        expect(sum(3,5)).toEqual(8)
    })
})