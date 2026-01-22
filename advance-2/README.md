# Advance-2: Local Storage & Data Persistence

Learn how to save data in the browser that persists even after closing the page or browser.

---

## What You Will Learn

- How to use `localStorage` to save data
- Difference between `localStorage` and `sessionStorage`
- How to store objects and arrays using JSON
- Building features like user preferences and search history
- Cross-tab communication with storage events
- Data expiration patterns

---

## Key Concepts

### 1. localStorage Basics

```javascript
// Save data (value must be a string)
localStorage.setItem('name', 'John');

// Get data (returns string or null)
const name = localStorage.getItem('name');

// Remove one item
localStorage.removeItem('name');

// Clear all data
localStorage.clear();

// Get number of items
console.log(localStorage.length);
```

### 2. Storing Objects and Arrays

localStorage only stores strings! Use JSON for objects and arrays.

```javascript
// Save an object
const user = { name: 'John', age: 25 };
localStorage.setItem('user', JSON.stringify(user));

// Get the object back
const savedUser = JSON.parse(localStorage.getItem('user'));
console.log(savedUser.name); // 'John'

// Save an array
const items = ['apple', 'banana', 'orange'];
localStorage.setItem('items', JSON.stringify(items));

// Get the array back
const savedItems = JSON.parse(localStorage.getItem('items'));
```

### 3. localStorage vs sessionStorage

| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| Data persists | Forever (until cleared) | Until tab is closed |
| Shared between tabs | Yes | No |
| Storage limit | ~5MB | ~5MB |

```javascript
// sessionStorage works the same way
sessionStorage.setItem('temp', 'This disappears when tab closes');
```

### 4. Checking if Data Exists

```javascript
const data = localStorage.getItem('key');

if (data !== null) {
    console.log('Data exists:', data);
} else {
    console.log('No data found');
}
```

### 5. Storage Events (Cross-Tab)

```javascript
// Listen for changes in OTHER tabs
window.addEventListener('storage', (event) => {
    console.log('Key changed:', event.key);
    console.log('Old value:', event.oldValue);
    console.log('New value:', event.newValue);
});
```

---

## Exercises

| # | Exercise | Description |
|---|----------|-------------|
| 1 | Basic Operations | Save, get, and delete data |
| 2 | User Preferences | Save theme color and font size |
| 3 | Visit Counter | Count page visits and button clicks |
| 4 | Search History | Save and display recent searches |
| 5 | Contacts List | Store contacts as JSON array |
| 6 | Storage Comparison | Compare localStorage vs sessionStorage |
| 7 | Cross-Tab Messages | Send messages between browser tabs |
| 8 | Data Expiration | Store data that expires after time |

---

## How to Use

1. Open `index.html` in your browser
2. Open the browser console (F12)
3. Try saving and loading data
4. Refresh the page - your data is still there!
5. Open the same page in another tab to test cross-tab features

---

## Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| Storing objects directly | Use `JSON.stringify()` before saving |
| Forgetting to parse | Use `JSON.parse()` when getting objects |
| Not checking for null | Always check if `getItem()` returns null |
| Storing sensitive data | Never store passwords or tokens in localStorage |

---

## Practical Examples

### Save User Preferences
```javascript
const prefs = {
    theme: 'dark',
    fontSize: 16,
    language: 'en'
};
localStorage.setItem('preferences', JSON.stringify(prefs));
```

### Load on Page Start
```javascript
window.addEventListener('load', () => {
    const saved = localStorage.getItem('preferences');
    if (saved) {
        const prefs = JSON.parse(saved);
        applyPreferences(prefs);
    }
});
```

### Add to Array
```javascript
// Get existing array or empty array
let history = JSON.parse(localStorage.getItem('history') || '[]');

// Add new item
history.push('new search');

// Save back
localStorage.setItem('history', JSON.stringify(history));
```

---

## View Storage in DevTools

1. Open DevTools (F12)
2. Go to **Application** tab
3. Expand **Local Storage** in the sidebar
4. Click on your domain to see all stored data

---

## Data Expiration Pattern

localStorage doesn't have built-in expiration. Here's how to add it:

```javascript
// Save with expiry
function saveWithExpiry(key, value, minutes) {
    const data = {
        value: value,
        expiry: Date.now() + (minutes * 60 * 1000)
    };
    localStorage.setItem(key, JSON.stringify(data));
}

// Get and check expiry
function getWithExpiry(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const data = JSON.parse(item);
    if (Date.now() > data.expiry) {
        localStorage.removeItem(key);
        return null; // Expired
    }
    return data.value;
}
```

---

## Next Steps

After completing this module, move on to **Advance-3: Error Handling & Form Validation** to learn how to handle errors gracefully.
