# Advance-4: Working with APIs - Mini Projects

Build real applications using external APIs. Learn CRUD operations, pagination, search, and caching.

---

## What You Will Learn

- Fetching and displaying API data
- CRUD operations (Create, Read, Update, Delete)
- HTTP methods: GET, POST, PUT, PATCH, DELETE
- Pagination and "Load More" patterns
- Search with debouncing
- Loading states and skeleton screens
- API response caching

---

## Key Concepts

### 1. HTTP Methods

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read data | Get list of users |
| POST | Create new data | Add new user |
| PUT | Replace entire data | Update all user fields |
| PATCH | Update partial data | Update only user name |
| DELETE | Remove data | Delete a user |

### 2. GET Request

```javascript
// Simple GET
const response = await fetch('https://api.example.com/users');
const users = await response.json();
```

### 3. POST Request (Create)

```javascript
const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John',
        email: 'john@example.com'
    })
});
const newUser = await response.json();
```

### 4. PUT Request (Replace All)

```javascript
const response = await fetch('https://api.example.com/users/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        id: 1,
        name: 'John Updated',
        email: 'john.new@example.com'
    })
});
```

### 5. PATCH Request (Update Some)

```javascript
const response = await fetch('https://api.example.com/users/1', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'John Updated'  // Only update name
    })
});
```

### 6. DELETE Request

```javascript
const response = await fetch('https://api.example.com/users/1', {
    method: 'DELETE'
});
```

---

## Projects

| # | Project | What You Build |
|---|---------|----------------|
| 1 | User Directory | Fetch and display user cards |
| 2 | Blog Posts | Load posts and their comments |
| 3 | Todo App | Full CRUD with filtering |
| 4 | Photo Gallery | Pagination with "Load More" |
| 5 | Search & Filter | Debounced search |
| 6 | CRUD Demo | Test all HTTP methods |
| 7 | Loading States | Skeleton screens and error UI |
| 8 | API Caching | Cache responses for speed |

---

## How to Use

1. Open `index.html` in your browser
2. Open the browser console (F12)
3. Try each project and watch the network requests
4. Experiment with different operations

---

## API Used

**JSONPlaceholder** - https://jsonplaceholder.typicode.com

Free fake REST API with these endpoints:

| Endpoint | Data |
|----------|------|
| `/users` | 10 users |
| `/posts` | 100 posts |
| `/comments` | 500 comments |
| `/todos` | 200 todos |
| `/photos` | 5000 photos |
| `/albums` | 100 albums |

### Query Parameters

```javascript
// Limit results
fetch('/posts?_limit=5')

// Pagination
fetch('/posts?_page=2&_limit=10')

// Filter by field
fetch('/posts?userId=1')

// Nested resources
fetch('/posts/1/comments')
```

---

## Pagination Pattern

```javascript
let page = 1;
const limit = 10;

async function loadMore() {
    const response = await fetch(`/posts?_page=${page}&_limit=${limit}`);
    const posts = await response.json();

    displayPosts(posts);
    page++;

    // Hide button if no more data
    if (posts.length < limit) {
        hideLoadMoreButton();
    }
}
```

---

## Debouncing (Search)

Prevent API calls on every keystroke:

```javascript
let timeout;

searchInput.addEventListener('input', () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        // This runs 300ms after user stops typing
        performSearch(searchInput.value);
    }, 300);
});
```

---

## Simple Caching

```javascript
const cache = new Map();

async function fetchWithCache(url) {
    // Check cache first
    if (cache.has(url)) {
        console.log('Cache hit!');
        return cache.get(url);
    }

    // Fetch from API
    const response = await fetch(url);
    const data = await response.json();

    // Store in cache
    cache.set(url, data);

    return data;
}
```

---

## Loading States

```javascript
// Show loading
loadingElement.style.display = 'block';
contentElement.innerHTML = '';

try {
    const data = await fetch(url);
    // Show content
    contentElement.innerHTML = renderData(data);
} catch (error) {
    // Show error
    contentElement.innerHTML = '<p>Error loading data</p>';
} finally {
    // Hide loading
    loadingElement.style.display = 'none';
}
```

---

## Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| Forgetting Content-Type header | Add `'Content-Type': 'application/json'` for POST/PUT/PATCH |
| Not stringifying body | Use `JSON.stringify()` for request body |
| Not handling errors | Always use try-catch with fetch |
| Too many API calls | Use debouncing for search inputs |
| Not checking response.ok | Check `if (!response.ok)` before parsing |

---

## Response Checking

```javascript
const response = await fetch(url);

if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();
```

---

## DevTools Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter by **Fetch/XHR**
4. Click on a request to see:
   - Request headers and body
   - Response headers and body
   - Status code
   - Timing

---

## Next Steps

After completing this module, move on to **Advance-5: Final Project - Notes App** to build a complete application using all the concepts you've learned.
