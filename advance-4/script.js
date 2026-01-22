/**
 * Advance 4: Working with APIs - Mini Projects
 *
 * Learn how to:
 * - Fetch data from APIs
 * - Display data in cards and lists
 * - CRUD operations (Create, Read, Update, Delete)
 * - Pagination and search
 */

console.log('=== Advance 4: Working with APIs ===');

const API = 'https://jsonplaceholder.typicode.com';
let allUsers = [];


// ============================================
// PROJECT 1: User Directory
// ============================================

const loadUsersBtn = document.querySelector('#load-users-btn');
const clearUsersBtn = document.querySelector('#clear-users-btn');
const usersGrid = document.querySelector('#users-grid');
const usersLoading = document.querySelector('#users-loading');

loadUsersBtn.addEventListener('click', async () => {
    usersLoading.style.display = 'block';
    usersGrid.innerHTML = '';

    try {
        const response = await fetch(`${API}/users`);
        const users = await response.json();
        allUsers = users;

        usersLoading.style.display = 'none';

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h4>${user.name}</h4>
                <p>@${user.username}</p>
                <p>${user.email}</p>
                <p>${user.address.city}</p>
            `;
            usersGrid.appendChild(card);
        });
    } catch (error) {
        usersLoading.style.display = 'none';
        usersGrid.innerHTML = `<div class="output error">Error: ${error.message}</div>`;
    }
});

clearUsersBtn.addEventListener('click', () => {
    usersGrid.innerHTML = '';
});


// ============================================
// PROJECT 2: Blog Posts with Comments
// ============================================

const postSelect = document.querySelector('#post-select');
const loadPostsBtn = document.querySelector('#load-posts-btn');
const postsList = document.querySelector('#posts-list');
const commentsContainer = document.querySelector('#comments-container');

loadPostsBtn.addEventListener('click', async () => {
    postsList.innerHTML = '<div class="output">Loading...</div>';

    try {
        const response = await fetch(`${API}/posts?_limit=10`);
        const posts = await response.json();

        postsList.innerHTML = '';
        postSelect.innerHTML = '<option value="">Select a post...</option>';

        posts.forEach(post => {
            // Add to dropdown
            const option = document.createElement('option');
            option.value = post.id;
            option.textContent = post.title.substring(0, 40) + '...';
            postSelect.appendChild(option);

            // Add to list
            const div = document.createElement('div');
            div.className = 'post-item';
            div.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
            postsList.appendChild(div);
        });
    } catch (error) {
        postsList.innerHTML = `<div class="output error">Error: ${error.message}</div>`;
    }
});

postSelect.addEventListener('change', async () => {
    const postId = postSelect.value;
    if (!postId) return;

    commentsContainer.innerHTML = '<div class="output">Loading comments...</div>';

    try {
        const response = await fetch(`${API}/posts/${postId}/comments`);
        const comments = await response.json();

        commentsContainer.innerHTML = `<h3>Comments (${comments.length})</h3>`;
        comments.forEach(comment => {
            const div = document.createElement('div');
            div.className = 'comment';
            div.innerHTML = `<b>${comment.name}</b><p>${comment.body}</p>`;
            commentsContainer.appendChild(div);
        });
    } catch (error) {
        commentsContainer.innerHTML = `<div class="output error">Error: ${error.message}</div>`;
    }
});


// ============================================
// PROJECT 3: Todo App
// ============================================

const todoInput = document.querySelector('#todo-input');
const addTodoBtn = document.querySelector('#add-todo-btn');
const todoList = document.querySelector('#todo-list');
const todoCount = document.querySelector('#todo-count');
const completedCount = document.querySelector('#completed-count');
const pendingCount = document.querySelector('#pending-count');
const tabBtns = document.querySelectorAll('.tab-btn');

let todos = [];
let filter = 'all';

async function loadTodos() {
    try {
        const response = await fetch(`${API}/todos?_limit=10`);
        todos = await response.json();
        renderTodos();
    } catch (error) {
        todoList.innerHTML = `<div class="output error">Error: ${error.message}</div>`;
    }
}

function renderTodos() {
    let filtered = todos;
    if (filter === 'active') filtered = todos.filter(t => !t.completed);
    if (filter === 'completed') filtered = todos.filter(t => t.completed);

    todoList.innerHTML = '';
    filtered.forEach(todo => {
        const div = document.createElement('div');
        div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <span>${todo.title}</span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(div);
    });

    todoCount.textContent = todos.length;
    completedCount.textContent = todos.filter(t => t.completed).length;
    pendingCount.textContent = todos.filter(t => !t.completed).length;
}

addTodoBtn.addEventListener('click', async () => {
    const title = todoInput.value.trim();
    if (!title) return;

    const newTodo = { id: Date.now(), title, completed: false };
    todos.unshift(newTodo);
    todoInput.value = '';
    renderTodos();
});

window.toggleTodo = function(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    renderTodos();
};

window.deleteTodo = function(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
};

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filter = btn.dataset.filter;
        renderTodos();
    });
});

loadTodos();


// ============================================
// PROJECT 4: Photo Gallery
// ============================================

const albumSelect = document.querySelector('#album-select');
const loadPhotosBtn = document.querySelector('#load-photos-btn');
const loadMoreBtn = document.querySelector('#load-more-btn');
const photosGrid = document.querySelector('#photos-grid');
const photosLoading = document.querySelector('#photos-loading');

let photoPage = 1;

async function loadPhotos(append = false) {
    photosLoading.style.display = 'block';
    if (!append) {
        photosGrid.innerHTML = '';
        photoPage = 1;
    }

    try {
        let url = `${API}/photos?_page=${photoPage}&_limit=12`;
        if (albumSelect.value) url += `&albumId=${albumSelect.value}`;

        const response = await fetch(url);
        const photos = await response.json();

        photosLoading.style.display = 'none';
        loadMoreBtn.style.display = photos.length === 12 ? 'inline-block' : 'none';

        photos.forEach(photo => {
            const div = document.createElement('div');
            div.className = 'photo-item';
            div.innerHTML = `<img src="${photo.thumbnailUrl}" alt="${photo.title}"><p>${photo.title}</p>`;
            photosGrid.appendChild(div);
        });
    } catch (error) {
        photosLoading.style.display = 'none';
        photosGrid.innerHTML = `<div class="output error">Error: ${error.message}</div>`;
    }
}

loadPhotosBtn.addEventListener('click', () => loadPhotos(false));
loadMoreBtn.addEventListener('click', () => { photoPage++; loadPhotos(true); });
albumSelect.addEventListener('change', () => loadPhotos(false));


// ============================================
// PROJECT 5: Search & Filter
// ============================================

const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const searchGrid = document.querySelector('#search-grid');

let searchTimeout;

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        searchResults.textContent = 'Start typing to search...';
        searchGrid.innerHTML = '';
        return;
    }

    searchResults.textContent = 'Searching...';

    // Debounce: wait 300ms before searching
    searchTimeout = setTimeout(async () => {
        if (allUsers.length === 0) {
            const response = await fetch(`${API}/users`);
            allUsers = await response.json();
        }

        const filtered = allUsers.filter(u =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query)
        );

        searchResults.textContent = `Found ${filtered.length} user(s)`;
        searchGrid.innerHTML = filtered.map(u => `
            <div class="user-card">
                <h4>${u.name}</h4>
                <p>@${u.username}</p>
                <p>${u.email}</p>
            </div>
        `).join('');
    }, 300);
});


// ============================================
// EXERCISE 6: CRUD Operations
// ============================================
// POST = Create, PUT = Replace All, PATCH = Update Some, DELETE = Remove

const newPostTitle = document.querySelector('#new-post-title');
const newPostBody = document.querySelector('#new-post-body');
const createPostBtn = document.querySelector('#create-post-btn');
const updatePostTitle = document.querySelector('#update-post-title');
const updatePostBtn = document.querySelector('#update-post-btn');
const patchPostBtn = document.querySelector('#patch-post-btn');
const deletePostId = document.querySelector('#delete-post-id');
const deletePostBtn = document.querySelector('#delete-post-btn');
const crudOutput = document.querySelector('#crud-output');

// POST - Create new
createPostBtn.addEventListener('click', async () => {
    const title = newPostTitle.value.trim();
    const body = newPostBody.value.trim();
    if (!title || !body) return;

    crudOutput.textContent = 'Creating...';

    const response = await fetch(`${API}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, userId: 1 })
    });

    const data = await response.json();
    crudOutput.textContent = 'POST Response:\n' + JSON.stringify(data, null, 2);
});

// PUT - Replace entire resource
updatePostBtn.addEventListener('click', async () => {
    const title = updatePostTitle.value.trim();
    if (!title) return;

    crudOutput.textContent = 'Updating with PUT...';

    const response = await fetch(`${API}/posts/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, title, body: 'New body', userId: 1 })
    });

    const data = await response.json();
    crudOutput.textContent = 'PUT Response:\n' + JSON.stringify(data, null, 2);
});

// PATCH - Update only some fields
patchPostBtn.addEventListener('click', async () => {
    const title = updatePostTitle.value.trim();
    if (!title) return;

    crudOutput.textContent = 'Updating with PATCH...';

    const response = await fetch(`${API}/posts/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    const data = await response.json();
    crudOutput.textContent = 'PATCH Response:\n' + JSON.stringify(data, null, 2);
});

// DELETE
deletePostBtn.addEventListener('click', async () => {
    const id = deletePostId.value;
    if (!id) return;

    crudOutput.textContent = 'Deleting...';

    const response = await fetch(`${API}/posts/${id}`, { method: 'DELETE' });
    crudOutput.textContent = `DELETE Response: ${response.status} OK`;
});


// ============================================
// EXERCISE 7: Loading States
// ============================================

const fetchLoadingBtn = document.querySelector('#fetch-loading-btn');
const fetchSlowBtn = document.querySelector('#fetch-slow-btn');
const fetchErrorBtn = document.querySelector('#fetch-error-btn');
const loadingSkeleton = document.querySelector('#loading-skeleton');
const loadingResult = document.querySelector('#loading-result');
const loadingOutput = document.querySelector('#loading-output');

fetchLoadingBtn.addEventListener('click', async () => {
    loadingSkeleton.style.display = 'block';
    loadingResult.innerHTML = '';

    const response = await fetch(`${API}/users?_limit=3`);
    const users = await response.json();

    loadingSkeleton.style.display = 'none';
    loadingResult.innerHTML = users.map(u => `
        <div class="user-card"><h4>${u.name}</h4><p>@${u.username}</p></div>
    `).join('');
    loadingOutput.textContent = 'Loaded!';
});

fetchSlowBtn.addEventListener('click', async () => {
    loadingSkeleton.style.display = 'block';
    loadingResult.innerHTML = '';
    loadingOutput.textContent = 'Simulating 3 second delay...';

    await new Promise(r => setTimeout(r, 3000));

    const response = await fetch(`${API}/users?_limit=3`);
    const users = await response.json();

    loadingSkeleton.style.display = 'none';
    loadingResult.innerHTML = users.map(u => `
        <div class="user-card"><h4>${u.name}</h4></div>
    `).join('');
    loadingOutput.textContent = 'Done after 3s!';
});

fetchErrorBtn.addEventListener('click', async () => {
    loadingSkeleton.style.display = 'block';
    loadingOutput.textContent = 'Trying invalid URL...';

    try {
        const response = await fetch(`${API}/invalid-endpoint`);
        if (!response.ok) throw new Error('HTTP ' + response.status);
    } catch (error) {
        loadingSkeleton.style.display = 'none';
        loadingResult.innerHTML = `<div class="output error">Error: ${error.message}</div>`;
        loadingOutput.textContent = 'Error handled gracefully!';
    }
});


// ============================================
// EXERCISE 8: API Caching
// ============================================

const fetchUncachedBtn = document.querySelector('#fetch-uncached-btn');
const fetchCachedBtn = document.querySelector('#fetch-cached-btn');
const clearCacheBtn = document.querySelector('#clear-cache-btn');
const cacheHitsDisplay = document.querySelector('#cache-hits');
const cacheMissesDisplay = document.querySelector('#cache-misses');
const cacheOutput = document.querySelector('#cache-output');

const cache = new Map();
let cacheHits = 0;
let cacheMisses = 0;

fetchUncachedBtn.addEventListener('click', async () => {
    const start = Date.now();
    const response = await fetch(`${API}/users/1`);
    const user = await response.json();
    const time = Date.now() - start;

    cacheMisses++;
    cacheMissesDisplay.textContent = cacheMisses;
    cacheOutput.textContent = `Fetched from API (${time}ms)\n\n${user.name}`;
});

fetchCachedBtn.addEventListener('click', async () => {
    const start = Date.now();

    if (cache.has('user1')) {
        const user = cache.get('user1');
        const time = Date.now() - start;
        cacheHits++;
        cacheHitsDisplay.textContent = cacheHits;
        cacheOutput.textContent = `CACHE HIT! (${time}ms)\n\n${user.name}`;
        return;
    }

    const response = await fetch(`${API}/users/1`);
    const user = await response.json();
    cache.set('user1', user);
    const time = Date.now() - start;

    cacheMisses++;
    cacheMissesDisplay.textContent = cacheMisses;
    cacheOutput.textContent = `Cache miss - fetched from API (${time}ms)\nClick again for cache hit!`;
});

clearCacheBtn.addEventListener('click', () => {
    cache.clear();
    cacheHits = 0;
    cacheMisses = 0;
    cacheHitsDisplay.textContent = '0';
    cacheMissesDisplay.textContent = '0';
    cacheOutput.textContent = 'Cache cleared!';
});


console.log('Advance 4 loaded! Try each project.');
