function toggle() {
    var index=-1;
    var parentArguments = arguments;

    // toggler closing over to variables, index and parentArguments
    // cannot call arguments directly because of shadowing
    return function toggler() {
        // closure in a variable is a reference to the actual variable, not a copy nor snapshot.
        index = (index+1)%parentArguments.length;
        return parentArguments[index];
    }
}
var hello = toggle("hello");
var onOff = toggle("on", "off");
var speed = toggle("slow", "medium", "fast");
var undToggler = toggle();

console.log(undToggler()); // undefined ??
console.log(hello());    // "hello"
console.log(hello());    // "hello"

console.log(onOff());    // "on"
console.log(onOff());    // "off"
console.log(onOff());    // "on"

console.log(speed());    // "slow"
console.log(speed());    // "medium"
console.log(speed());    // "fast"
console.log(speed());    // "slow"

