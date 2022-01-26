var MAINAPP = (function(nsp) {
    "use strict";
    let url = 'https://jsonplaceholder.typicode.com/';

    let fetchPosts = (async function () {
        let data = await fetch(url + 'posts/');
        nsp.posts = await data.json();
    })();
    let fetchTodos = (async function () {
        let data = await fetch(url + 'todos/');
        nsp.todos = await data.json();
    })();
    let fetchComments = (async function () {
        let data = await fetch(url + 'comments/');
        nsp.comments = await data.json();
    })();
    Promise.all([
        fetchPosts,
        fetchTodos,
        fetchComments
    ]).then(values => {
        console.log(nsp);
    });
    console.log( 'Remaining Code.');
    return nsp;
})(MAINAPP || {});
