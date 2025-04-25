# 📦 demo02-type-coercion

This demo demonstrates **type coercion** in JavaScript, where the language automatically converts values from one type to another in certain operations.

---

## 🔍 Description

JavaScript has automatic type conversion, or **type coercion**, that occurs when values of different types are involved in operations. This can happen with:

- **Primitives** (e.g., `string`, `number`, `boolean`)
- **Objects**, which can be coerced to primitives when necessary

This demo covers several examples of coercion in JavaScript and shows how different types are converted when used in various expressions.

---

## 🧪 Code Breakdown

### ✅ **Floating Point Precision Issue**

```js
const coercedSixteenNines = 9999999999999999
console.log(coercedSixteenNines) // 10000000000000000
```

- Floating point precision issues cause `9999999999999999` to be coerced to `10000000000000000`.

### ✅ **Booleans and Arithmetic**

```js
const booleanPlusTwo = true + 2
console.log(booleanPlusTwo) // 3
```
- `true` is coerced to `1`, so `1 + 2` results in `3`.

### ✅ String and Boolean Concatenation

```js
const stringPlusTrue = '21' + true
console.log(stringPlusTrue) // '21true'
```

- `true` is coerced to the string `true`, so `'21'` + `true` results in `'21true'`.

### ✅ **Subtraction with String and Boolean**

```js
const stringMinusTrue = '21' - true
console.log(stringMinusTrue) // 20
```

- `'21'` is coerced to `21` (number), and `true` is coerced to `1`. So, `21 - 1` results in `20`.

### ✅ Adding Negative One to a String

```js
const stringMinusNegativeOne = '21' - -1
console.log(stringMinusNegativeOne) // 22
```

- `'21'` is coerced to `21` (number) and `-1` is coerced to 1, so `21 - -1` results in `22`.

### ✅ Floating Point Precision in Sum

```js
const impreciseFloatSum = 0.1 + 0.2
console.log(impreciseFloatSum) // 0.30000000000000004
```

- Due to floating point precision issues, `0.1 + 0.2` does not result in exactly `0.3`, but `0.30000000000000004`.

### ✅ Weird Comparison

```js
const weirdComparisonFalse = 3 > 2 > 1
console.log(weirdComparisonFalse) // false
```

- `3 > 2` is `true`, which is coerced to `1`. Then `1 > 1` results in `false`.

### ✅ Correct Comparison with Coercion

```js
const weirdComparisonTrue = 3 > 2 >= 1
console.log(weirdComparisonTrue) // true
```

- `3 > 2` is `true`, which is coerced to `1`. Then `1 >= 1` results in `true`.

### ✅ Concatenating Strings and NaN

```js
const bananaTrick = "B" + "a" + + "a" + "a"
console.log(bananaTrick) // 'BaNaNa'
```

- `'B' + 'a' + NaN + 'a'` results in `'BaNaNa'` because the `+` operator coerces the string `"a"` to `NaN`.

### ✅ Loose Equality with Number

```js
const looseEqualityNumber = 1 == 1
console.log(looseEqualityNumber) // true
```

- `1 == 1` is `true` because they are the same value.

### ✅ Loose Equality with String

```js
const looseEqualityString = 1 == '1'
console.log(looseEqualityString) // true
```

- `1 == '1'` is true because `'1'` is coerced to `1` before the comparison.

### ✅ Explicit and Implicit Conversion

```js
console.assert(String(123) == '123', 'Explicit convertion to string') // true
console.assert(123 + '' === '123', 'Implicit conversion to string') // true
```

- The number `123` is explicitly coerced to a string, and implicitly coerced when concatenating with an empty string.

### ✅ Logical OR and AND Coercion

```js
console.assert(('hello' || 123) === 'hello', "||  returns the first truthy value") // true
console.assert(('hello' && 123) === 123, "&& returns the last element") // true
```

- The logical OR (`||`) returns the first truthy value, and the logical AND (`&&`) returns the last truthy element.

### ✅ Coercion in Objects

```js
const item = {
  name: 'user',
  age: 25,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    return 7
  }
}

console.log(item) // [object Object]
console.log(item.toString()) // Name: user, Age: 25
console.log(item.valueOf()) // 7
console.log(''.concat(item)) // Name: user, Age: 25  calls toString()
```

- The object `item` is coerced to a string using the `toString()` method, and its primitive value is returned using the `valueOf()` method.

### ✅ Custom Symbol for Coercion

```js
const item2 = {
  name: 'user',
  age: 25,
  toString() {
    console.log('toString called')
    return `Name: ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    console.log('valueOf called')
    return 7
  },
  [Symbol.toPrimitive](convertionType) {
    console.log('trying to convert to', convertionType)

    const types = {
      string: JSON.stringify(this),
      number: '0007',
    }

    return types[convertionType] || types.string
  }
}

console.log('String', String(item2)) // trying to convert to string
console.log('Number', Number(item2)) // trying to convert to number
```

- A custom method `[Symbol.toPrimitive]` is used to control the coercion process. The object `item2` is coerced to a string and number using this method, which takes precedence over `toString()` and `valueOf()`.

## 🧪 Assertions Used

```js
deepStrictEqual(coercedSixteenNines, 10000000000000000)
deepStrictEqual(booleanPlusTwo, 3)
deepStrictEqual(stringPlusTrue, '21true')
deepStrictEqual(stringMinusTrue, 20)
deepStrictEqual(stringMinusNegativeOne, 22)
deepStrictEqual(impreciseFloatSum, 0.30000000000000004)
deepStrictEqual(weirdComparisonFalse, false)
deepStrictEqual(weirdComparisonTrue, true)
deepStrictEqual(bananaTrick, 'BaNaNa')
deepStrictEqual(looseEqualityNumber, true)
deepStrictEqual(looseEqualityString, true)
```

- These assertions validate that the behavior aligns with expectations for type coercion in JavaScript.

## ▶️ How to Run

From the root of the project:

```bash
cd demo02-type-coercion
node index.js
```

## 📘 Related Topics

- JavaScript type coercion
- Implicit and explicit conversion
- `==` vs `===`
- Objects' `toString()` and `valueOf()`