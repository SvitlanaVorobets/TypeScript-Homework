"use strict";
let posts = [];
const ul = document.getElementById('posts');
const list = document.createDocumentFragment();
const key = document.getElementById("key");
const value = document.getElementById("value");
const patch = document.getElementById("patch");
document.getElementById('updatePost')?.addEventListener("click", update);
async function getData() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}
getData()
    .then(data => {
    posts = data;
    createPosts(posts);
})
    .catch(err => alert(err));
function createPosts(posts) {
    ul.innerHTML = '';
    posts.forEach(it => {
        let li = document.createElement('li');
        for (const [key, value] of Object.entries(it)) {
            let temp = document.createElement('p');
            temp.innerHTML = `${key}: ${value}`;
            li.appendChild(temp);
        }
        list.appendChild(li);
    });
    ul.appendChild(list);
}
function update() {
    if (key != null && value != null && patch != null) {
        let newPatch = !Number.isNaN(parseInt(patch.value)) ? +patch.value : patch.value;
        let newValue = !Number.isNaN(parseInt(value.value)) ? +value.value : value.value;
        updateObjectInArray(posts, key.value, newValue, { [key.value]: newPatch });
    }
}
function updateObjectInArray(initialArray, key, value, patch) {
    const clonePosts = [...initialArray];
    for (let it of clonePosts) {
        if (it[key] === value) {
            const index = clonePosts.findIndex(post => JSON.stringify(post) === JSON.stringify(it));
            clonePosts[index] = { ...it, ...patch };
        }
    }
    createPosts(clonePosts);
}
