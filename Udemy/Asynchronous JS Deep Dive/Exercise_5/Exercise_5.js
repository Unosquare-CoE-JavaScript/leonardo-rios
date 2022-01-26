let domain = 'https://jsonplaceholder.typecode.com/';
let posts = [];
async function fetchPostsByUserId (userId) {
    posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(data => data.json());
    console.log(posts);
    return posts;
}

fetchPostsByUserId('1');