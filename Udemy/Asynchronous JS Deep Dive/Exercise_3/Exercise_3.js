"use strict";
const massiveProcess = function(num) {
    let result = 0;
    for (let i=num**7;i>=0; i--) {
        result += Math.atan(i)*Math.tan(i);
    }
    return result;
}

let calculateAmt = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(massiveProcess(12)),0);
}).then(amt => console.log(`The number is: ${amt}`));

console.log(5 * 5 + 100);