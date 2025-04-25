// Type coercion in JavaScript
const coercedSixteenNines = 9999999999999999 // 10000000000000000
// 9999999999999999 is coerced to 10000000000000000 due to floating point precision issues
console.log(coercedSixteenNines) // 10000000000000000

const booleanPlusTwo = true + 2 // true is coerced to 1, so 1 + 2 = 3
console.log(booleanPlusTwo) // 3

const stringPlusTrue = '21' + true // true is coerced to 'true', so '21' + 'true' = '21true'
console.log(stringPlusTrue) // '21true'

const stringMinusTrue = '21' - true // '21' is coerced to 21 and true is corced to 1, so 21 - 1 = 20
console.log(stringMinusTrue) // 20

const stringMinusNegativeOne = '21' - -1 // '21' is coerced to 21 and -1 is coerced to 1, so 21 - -1 = 22
console.log(stringMinusNegativeOne) // 22

const impreciseFloatSum = 0.1 + 0.2 // 0.1 + 0.2 is not exactly 0.3 due to floating point precision issues
console.log(impreciseFloatSum) // 0.30000000000000004

const weirdComparisonFalse = 3 > 2 > 1 // 3 > 2 is true, which is coerced to 1, so 1 > 1 = false
console.log(weirdComparisonFalse) // false

const weirdComparisonTrue = 3 > 2 >= 1 // 3 > 2 is true, which is coerced to 1, so 1 >= 1 = true
console.log(weirdComparisonTrue) // true 

const bananaTrick = "B" + "a" + + "a" + "a" // 'B' + 'a' + NaN + 'a' = 'Banana'
console.log(bananaTrick) // 'BaNaNa'

const looseEqualityNumber = 1 == 1 // true
console.log(looseEqualityNumber) // true

const looseEqualityString = 1 == '1' // true, because '1' is coerced to 1
console.log(looseEqualityString) // true

console.assert(String(123) == '123', 'Explicit convertion to string') // true, because 123 is coerced to '123' 
console.assert(123 + '' === '123', 'Implicit conversion to string') // true, because 123 is coerced to '123'
console.assert(('hello' || 123) === 'hello', "||  returns the first truthy value") // true, because 'hello' is truthy
console.assert(('hello' && 123) === 123, "&& returns the last element") // true, because 123 is truthy

// Coercion in objects
const item = {
  name: 'user',
  age: 25,
  // string: 1 if not to be primitive, calls valueOf() first, then toString()
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: 7 if not to be primitive, calls toString() first, then valueOf()
  valueOf() {
    return 7
  }
}

console.log(item) // [object Object]
console.log(item.toString()) // Name: user, Age: 25
console.log(item.valueOf()) // 7
console.log(''.concat(item)) // Name: user, Age: 25  calls toString()

const item2 = {
  name: 'user',
  age: 25,
  // string: 1 if not to be primitive, calls valueOf() first, then toString()
  toString() {
    console.log('toString called') // this line is never reached
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // number: 7 if not to be primitive, calls toString() first, then valueOf()
  valueOf() {
    console.log('valueOf called') // this line is never reached
    return 7
  },
  // define a custom method to handle the conversion. ToString() and valueOf() aren't called
  [Symbol.toPrimitive](convertionType) {
    console.log('trying to convert to', convertionType)

    const types = {
      string: JSON.stringify(this),
      number: '0007',
    }

    return types[convertionType] || types.string // if not string or number, return string
  }
}

console.log('String', String(item2)) // trying to convert to string
console.log('Number', Number(item2)) // trying to convert to number