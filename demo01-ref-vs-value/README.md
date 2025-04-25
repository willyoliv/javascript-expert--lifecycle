# 📦 demo01-ref-vs-value

This demo explores the difference between **primitive values** and **reference types** in JavaScript.

---

## 🔍 Description

JavaScript treats primitive types (such as `number`, `string`, `boolean`) differently from reference types (such as `objects` and `arrays`). 

This demo shows how assigning and modifying these types affects their values and references in memory.

---

## 🧪 Code Breakdown

### ✅ Primitives: copied by value

```js
let counter = 0
let counter2 = counter

counter2++
console.log(counter2) // 1
console.log(counter)  // 0
```

- `counter2` is a copy of `counter`, not a reference.
- Incrementing `counter2` does not change `counter`.

### ✅ Objects: assigned by reference

```js
const item = { counter: 0 }
const item2 = item

item2.counter++           // modifies item.counter
item.counter++            // also modifies item2.counter

console.log(item.counter) // 2
console.log(item2.counter) // 2
```

- `item2` is a reference to the same object as `item`.
- Any changes made through one are reflected in the other.

## 🧪 Assertions Used

```js
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)
deepStrictEqual(item.counter, 1)
deepStrictEqual(item2.counter, 2)
```

- These assertions validate that the behavior aligns with expectations for primitive vs reference types.

---

## ▶️ How to Run

From the root of the project:

```bash
cd demo01-ref-vs-value
node index.js
```

## 📘 Related Topics

- JavaScript memory management
- Stack vs heap
- Primitive vs reference semantics


