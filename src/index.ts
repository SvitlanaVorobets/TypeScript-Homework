interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

let posts: IPost[] = [];

const ul = document.getElementById('posts');
const list = document.createDocumentFragment();
const key = document.getElementById("key") as HTMLInputElement | null;
const value = document.getElementById("value") as HTMLInputElement | null;
const patch = document.getElementById("patch") as HTMLInputElement | null;
document.getElementById('updatePost')?.addEventListener("click", update);

async function getData<T>(): Promise<T> {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}

getData<IPost[]>()
    .then(data => {
        posts = data;
        createPosts(posts);
    })
    .catch(err => alert(err))

function createPosts(posts: any[]){
    ul!.innerHTML = '';
    posts.forEach(it => {
        let li = document.createElement('li');

            for (const [key, value] of Object.entries(it)) {
                let temp = document.createElement('p');
                temp.innerHTML = `${key}: ${value}`
                li.appendChild(temp);
            }

        list.appendChild(li);
    })
    ul!.appendChild(list);
}

function update(){  
    if (key != null && value != null && patch != null) {
        let newPatch = !Number.isNaN(parseInt(patch.value)) ?  +patch.value : patch.value
        let newValue = !Number.isNaN(parseInt(value.value)) ?  +value.value : value.value
        updateObjectInArray<IPost>(posts, key.value, newValue, {[key.value]: newPatch});
    }
}

function updateObjectInArray<T>(initialArray: T[], key: string, value: number | string , patch: Partial<T>){
    const clonePosts = [...initialArray];

    for(let it of clonePosts){
        if(it[key as keyof T] === value){
            const index = clonePosts.findIndex(post => JSON.stringify(post) === JSON.stringify(it))
            clonePosts[index] = {...it, ...patch};
        }
    }
    createPosts(clonePosts);
}