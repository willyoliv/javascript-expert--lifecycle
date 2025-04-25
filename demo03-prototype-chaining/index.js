const assert = require('assert')

const obj = {}
const arr = []
const fn = () => {}

// Internally, literal objects become explicit functions
console.log('new Object() === {}', new Object().__proto__ === {}.__proto__) // true
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ is a reference to the prototype of the object
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype) // true
assert.deepStrictEqual(obj.__proto__, Object.prototype) // true

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype) // true
assert.deepStrictEqual(arr.__proto__, Array.prototype) // true

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype) // true
assert.deepStrictEqual(fn.__proto__, Function.prototype) // true

// __proto__ of Object.prototype is null
console.log('Object.prototype.__proto__ === null', Object.prototype.__proto__ === null) // true
assert.deepStrictEqual(Object.prototype.__proto__, null) // true

function Employee() {}
Employee.prototype.salary = () => "salary**"

console.log(Employee.prototype.salary()) // salary**

function Supervisor() {}

Supervisor.prototype = Object.create(Employee.prototype) // Inherit from Employee
Supervisor.prototype.profitShare = () => "profitShare**"

console.log(Supervisor.prototype.salary()) // salary**
console.log(Supervisor.prototype.profitShare()) // profitShare**

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype) // Inherit from Supervisor
Manager.prototype.monthlyBonus = () => "monthlyBonus**"

// we can call it via prototype, but if we try to call it directly it gives an error
// If you don't call 'new', the first __proto__ will be null
// The instance of Function, without inheriting our classes
// To access the classes without new, you can access them directly via the prototype 'Manager.prototype.salary', without the '.prototype' it will generate an error
console.log(Manager.prototype.salary()) // salary**

// When we call with new, the __proto__ receives the prototype
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary()) // salary**
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__) // true, validate if the __proto__ is the same as the Supervisor prototype
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__) // true

const manager = new Manager()
console.log('manager.salary()', manager.salary()) // salary**
console.log('manager.profitShare()', manager.profitShare()) // profitShare**
console.log('manager.monthlyBonus()', manager.monthlyBonus()) // monthlyBonus**

assert.deepStrictEqual(manager.__proto__, Manager.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null) // true

class T1 {
  ping() {
    return 'ping'
  }
}

class T2 extends T1 {
  pong() {
    return 'pong'
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot'
  }
}

const t3 = new T3()

console.log('te inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null) // null
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null) // true

console.log('t3.ping()', t3.ping()) // ping
console.log('t3.pong()', t3.pong()) // pong
console.log('t3.shoot()', t3.shoot()) // shoot

assert.deepStrictEqual(t3.__proto__, T3.prototype) // true
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype) // true
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype) // true
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype) // true
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null) // true