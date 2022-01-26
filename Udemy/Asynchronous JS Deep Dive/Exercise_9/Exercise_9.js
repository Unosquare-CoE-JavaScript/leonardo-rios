"use strict";
function *generateRandom(end) {
    while (true) {
        yield Math.floor(Math.random() * end) + 1;
    }
}

let it10 = generateRandom(10);
let it100 = generateRandom(100);
console.log(it10.next());
console.log(it10.next());
console.log(it10.next());
console.log(it100.next());
console.log(it100.next());
console.log(it100.next());
console.log('done');