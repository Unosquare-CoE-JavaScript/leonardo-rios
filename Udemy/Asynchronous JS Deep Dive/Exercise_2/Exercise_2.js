var MAINAPP = (function (nsp) {
  "use strict";
  return Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts").then(data => data.json()).then(posts => nsp.posts = posts),
    fetch("https://jsonplaceholder.typicode.com/comments").then(data => data.json()).then(comments => nsp.comments = comments),
    fetch("https://jsonplaceholder.typicode.com/todos").then(data => data.json()).then(todos => nsp.todos = todos)
  ]).then(() => nsp);
})(MAINAPP || {});

MAINAPP.then(nsp => console.log(nsp));