function range(start,end) {
    function getRange(end) {
        var ans = [];

        // nested scope 'getRange' fetching 'start' variable from a parent scope 'range'. This is closure!
        for (let i=start; i<=end; i++) {
            // nested for scope fetching 'ans' variable from parent scope
            ans.push(i);
        }
        return ans;
    }


    return arguments.length > 1 ? getRange(end) : getRange;
}


console.log(range(3,3)); // [3]
console.log(range(3,8)); // [3,4,5,6,7,8]
console.log(range(3,0)); // []
var start3 = range(3);
var start4 = range(4);

// all these functions are 'closed over' the 'start' variable in the 'range' function
console.log(start3(3)); // [3]
console.log(start3(8)); // [3,4,5,6,7,8]
console.log(start3(0)); // []
console.log(start4(6)); // [4,5,6]
