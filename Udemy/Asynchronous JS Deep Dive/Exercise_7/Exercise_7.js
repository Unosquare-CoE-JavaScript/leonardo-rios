let url = 'https://jsonplaceholder.typicode.com/';
async function fetchPosts (nsp) {
    try {
        let response = await fetch(url + 'posts/');
        nsp.posts = await response.json();
    } catch (e) {
        console.log(`Problem retrieving posts: ${e}`);
    }
};

var MAINAPP = (function(nsp) {
    "use strict";
    fetchPosts(nsp);
    return nsp;
})(MAINAPP || {});