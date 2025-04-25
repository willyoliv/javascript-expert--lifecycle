const { deepStrictEqual } = require('assert')

let counter = 0
let counter2 = counter

counter2++
// ?
console.log(counter2) // 1 the value of counter2 is 1 because it was incremented
console.log(counter) // 0 the value of counter is still 0 because counter2 is a copy of counter, not a reference to it

const item = { counter: 0 }
const item2 = item

// type primitives create copies of the memory
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// type objects create references to the memory
item2.counter++
deepStrictEqual(item.counter, 1)

item.counter++
deepStrictEqual(item2.counter, 2)