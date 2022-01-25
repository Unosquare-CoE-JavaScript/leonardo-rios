"use strict";

let todo = {
    completed: false,
    userId: 1,
    title: "Learn Promises"
};
async function createTodo (todo) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todo)
        });

        let obj = await response.json();

        console.log(obj);
    } catch (e) {
        console.error(`Unable to create todo ${e}`);
    }
}

createTodo(todo);
console.log('Other code');