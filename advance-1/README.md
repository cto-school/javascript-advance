# Advance-1: Async JavaScript & Fetch API

Learn how JavaScript handles operations that take time, like fetching data from servers or waiting for timers.

---

## What You Will Learn

- How to use timers (`setTimeout`, `setInterval`)
- What Promises are and how to use them
- Modern `async/await` syntax
- Fetching data from APIs with `fetch()`
- Running multiple requests in parallel
- Canceling requests with `AbortController`

---

## Key Concepts

### 1. setTimeout & setInterval

```javascript
// Run code ONCE after 2 seconds
setTimeout(() => {
    console.log('Hello after 2 seconds!');
}, 2000);

// Run code EVERY 1 second
const intervalId = setInterval(() => {
    console.log('This runs every second');
}, 1000);

// Stop the interval
clearInterval(intervalId);
```

### 2. Promises

A Promise represents a value that will be available in the future.

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    // Do async work...
    if (success) {
        resolve('Success!');
    } else {
        reject('Failed!');
    }
});

// Using a Promise
myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error));
```

### 3. Fetch API

```javascript
// Fetch data from an API
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error:', error));
```

### 4. Async/Await

A cleaner way to write Promise-based code:

```javascript
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error:', error);
    }
}
```

### 5. Promise.all (Parallel Requests)

```javascript
// Run multiple fetches at the same time
const [users, posts] = await Promise.all([
    fetch('/users').then(r => r.json()),
    fetch('/posts').then(r => r.json())
]);
```

### 6. Promise.race

```javascript
// First promise to finish wins
const winner = await Promise.race([
    fetch('/fast-server'),
    fetch('/slow-server')
]);
```

---

## Exercises

| # | Exercise | Description |
|---|----------|-------------|
| 1 | Delayed Message | Use `setTimeout` to show a message after 2 seconds |
| 2 | Countdown Timer | Use `setInterval` to count down from 10 |
| 3 | Promise Demo | See how Promises resolve and reject |
| 4 | Promise Chain | Chain multiple `.then()` calls |
| 5 | Fetch Users | Get users from JSONPlaceholder API |
| 6 | Promise.race | Race between fast and slow promises |
| 7 | AbortController | Cancel a fetch request |
| 8 | Execution Order | Understand sync vs async code order |

---

## How to Use

1. Open `index.html` in your browser
2. Open the browser console (F12)
3. Click the buttons to run each exercise
4. Watch the console for output

---

## Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| Forgetting `await` | Always use `await` before `fetch()` in async functions |
| Not handling errors | Always use `try-catch` or `.catch()` |
| Forgetting `.json()` | Call `response.json()` to parse the response |
| Using `await` outside async | `await` only works inside `async` functions |

---

## API Used

**JSONPlaceholder** - https://jsonplaceholder.typicode.com

Free fake API with endpoints:
- `/users` - 10 users
- `/posts` - 100 posts
- `/comments` - 500 comments

---

## Quick Test

Try this in the browser console:

```javascript
// Fetch a user
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(user => console.log(user.name));
```

---

## Next Steps

After completing this module, move on to **Advance-2: Local Storage** to learn how to save data in the browser.
