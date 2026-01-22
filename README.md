# Advanced JavaScript - Practice Exercises

This folder contains 5 advanced JavaScript modules that build upon the basic DOM manipulation concepts. Each module focuses on real-world programming patterns and techniques.

---

## Modules Overview

| Module | Topic | Key Concepts |
|--------|-------|--------------|
| advance-1 | Async JavaScript & Fetch API | setTimeout, Promises, async/await, fetch() |
| advance-2 | Local Storage & Data Persistence | localStorage, sessionStorage, JSON |
| advance-3 | Error Handling & Form Validation | try-catch, throw, form validation, regex |
| advance-4 | Working with APIs | CRUD operations, pagination, caching |
| advance-5 | Final Project - Notes App | Combines all concepts |

---

## Advance-1: Async JavaScript & Fetch API

**Learn how JavaScript handles asynchronous operations**

### Topics Covered:
- `setTimeout` and `setInterval` (timers)
- Promises and Promise states (pending, fulfilled, rejected)
- `.then()`, `.catch()`, `.finally()` methods
- `async/await` syntax
- `fetch()` API for HTTP requests
- `Promise.all()` for parallel requests
- `Promise.race()` for timeout patterns
- `AbortController` for canceling requests

### Exercises:
1. Delayed Message (setTimeout)
2. Countdown Timer (setInterval)
3. Promise Success/Failure
4. Promise Chaining
5. Fetch Users from API
6. Promise.race & Timeout Pattern
7. AbortController - Cancel Requests
8. Execution Order Demo

---

## Advance-2: Local Storage & Data Persistence

**Learn to save data in the browser that persists after page reload**

### Topics Covered:
- `localStorage.setItem()` and `getItem()`
- `localStorage.removeItem()` and `clear()`
- `JSON.stringify()` and `JSON.parse()`
- `sessionStorage` vs `localStorage`
- Storage events for cross-tab communication
- Data expiration patterns

### Exercises:
1. Basic localStorage Operations
2. Save User Preferences
3. Persistent Visit Counter
4. Search History
5. Contacts with JSON Storage
6. localStorage vs sessionStorage
7. Storage Events (Cross-Tab)
8. Data with Expiration (TTL)

---

## Advance-3: Error Handling & Form Validation

**Learn to handle errors gracefully and validate user input**

### Topics Covered:
- `try-catch-finally` blocks
- `throw new Error()` for custom errors
- Custom Error classes
- Real-time form validation
- Regular expressions (regex)
- Password strength checking
- Input formatting (credit card, phone)
- Async error handling

### Exercises:
1. JSON Parsing with Error Handling
2. Registration Form Validation
3. Password Strength Checker
4. Credit Card Validation
5. Async Error Handling (fetch)
6. throw & Custom Errors
7. try-catch-finally Demo
8. Error Handling Patterns (retry, fallback)

---

## Advance-4: Working with APIs - Mini Projects

**Build real applications using external APIs**

### Topics Covered:
- Fetching and displaying API data
- HTTP Methods: GET, POST, PUT, PATCH, DELETE
- Pagination (_page, _limit)
- Search with debouncing
- Loading states and skeleton screens
- API response caching
- Error handling for network requests

### Projects:
1. User Directory
2. Blog Posts with Comments
3. Todo App with CRUD
4. Photo Gallery with Pagination
5. Search & Filter with Debounce
6. CRUD Operations (POST/PUT/PATCH/DELETE)
7. Loading States & Error UI
8. API Response Caching

**API Used:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) - Free fake API

---

## Advance-5: Final Project - Notes App

**A complete application combining ALL concepts learned**

### Features:
- Create, Edit, Delete notes
- Color picker for notes
- Category filtering
- Search with debouncing
- Sort by date or title
- Pin important notes
- Dark mode toggle
- Export/Import notes (JSON)
- Data persistence with localStorage
- Keyboard shortcuts (Ctrl+S)

### Concepts Used:
- DOM Manipulation
- Event Handling
- Local Storage
- Error Handling
- Array Methods (filter, sort, find, map)
- Debouncing
- File API (export/import)

---

## How to Use

1. Navigate to any module folder (e.g., `advance-1`)
2. Open `index.html` in your browser
3. Open browser console (F12) to see logs
4. Read `chapter.txt` for detailed instructions
5. Try each exercise and experiment with the code

---

## Prerequisites

Before starting these advanced modules, you should be comfortable with:
- HTML & CSS basics
- JavaScript fundamentals (variables, functions, arrays, objects)
- DOM manipulation (querySelector, addEventListener, innerHTML)
- Basic event handling

---

## File Structure

```
advance/
├── README.md
├── advance-1/
│   ├── index.html
│   ├── script.js
│   └── chapter.txt
├── advance-2/
│   ├── index.html
│   ├── script.js
│   └── chapter.txt
├── advance-3/
│   ├── index.html
│   ├── script.js
│   └── chapter.txt
├── advance-4/
│   ├── index.html
│   ├── script.js
│   └── chapter.txt
└── advance-5/
    ├── index.html
    ├── script.js
    └── chapter.txt
```

---

## Tips for Learning

1. **Read the code** - Each file has comments explaining the concepts
2. **Use the console** - Open F12 to see detailed logs
3. **Experiment** - Modify the code and see what happens
4. **Break things** - Understanding errors helps you learn
5. **Build something** - Apply concepts to your own projects

---

## Quick Reference

### Async/Await
```javascript
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
}
```

### Local Storage
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key'));
```

### Error Handling
```javascript
try {
    // risky code
} catch (error) {
    // handle error
} finally {
    // always runs
}
```

### Debouncing
```javascript
let timeout;
input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        // search logic
    }, 300);
});
```

---

Happy Coding!
