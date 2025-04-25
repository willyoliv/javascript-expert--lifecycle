# 📘 JavaScript Prototypes and Inheritance – Deep Dive

This document explores how JavaScript handles **prototype chains**, **inheritance**, and how built-in types relate to their respective prototypes. It covers both constructor functions and `class`-based inheritance, with practical examples and validations.

---

## 🔹 1. Prototype Basics for Built-in Types

```js
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
```

## 🔹 2. Inheritance Using Constructor Functions
### 👔 Employee

```js
function Employee() {}
Employee.prototype.salary = () => "salary**"
console.log(Employee.prototype.salary()) // salary**
```

### 🧑‍💼 Supervisor
```js
function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

console.log(Supervisor.prototype.salary()) // salary**
console.log(Supervisor.prototype.profitShare()) // profitShare**
```
### 👨‍💼 Manager
```js
function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonus = () => "monthlyBonus**"

console.log(Manager.prototype.salary()) // salary**
```

### 🧬 Instantiating and Accessing Inherited Methods
```js
const manager = new Manager()

console.log('manager.salary()', manager.salary()) // salary**
console.log('manager.profitShare()', manager.profitShare()) // profitShare**
console.log('manager.monthlyBonus()', manager.monthlyBonus()) // monthlyBonus**
```

### 📚 Validating Prototype Chain
```js
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary()) // salary**
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__) // true
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__) // true

assert.deepStrictEqual(manager.__proto__, Manager.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype) // true
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null) // true
```

## 🔹 3. Class-based Inheritance
```js
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
```

## ✅ Final Notes
- prototype is a property on constructor functions that is used when creating new instances.
- __proto__ is the internal reference of an object pointing to the prototype from which it inherits.
- JavaScript objects inherit from a prototype chain that ends at Object.prototype.
- Understanding these relationships is key to mastering inheritance and the object model in JavaScript.