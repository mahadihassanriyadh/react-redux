function multiply(a) {
  return (b) => {
    return (c) => {
      return a * b * c;
    }
  }
}

// We can rewrite the above curried function in a more concise way using arrow functions:

const arrowMultiply = (a) => (b) => (c) => a * b * c;

console.log(multiply(2)(3)(4)); // 24
console.log(arrowMultiply(2)(3)(4)); // 24