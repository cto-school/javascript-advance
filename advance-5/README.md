# Advance-5: Final Project - Notes App

A complete notes application that combines ALL JavaScript concepts learned in this course.

---

## What You Will Build

A fully functional notes app with:
- Create, edit, and delete notes
- Color-coded notes
- Category filtering
- Search functionality
- Pin important notes
- Dark mode
- Export/Import notes
- Data persistence with localStorage

---

## Features

### Core Features
| Feature | Description |
|---------|-------------|
| Create Notes | Add new notes with title, content, and category |
| Edit Notes | Click on a note to edit it |
| Delete Notes | Remove notes with confirmation |
| Color Picker | Choose from 6 colors for each note |
| Categories | Organize notes by Personal, Work, Ideas, Other |

### Advanced Features
| Feature | Description |
|---------|-------------|
| Search | Find notes by title or content |
| Filter | Show notes by category |
| Sort | Order by newest, oldest, or title |
| Pin Notes | Keep important notes at the top |
| Dark Mode | Toggle between light and dark themes |
| Export | Download all notes as JSON file |
| Import | Load notes from JSON file |

---

## Concepts Used

This project uses everything you learned:

### From Basic Parts
- `querySelector` and `querySelectorAll`
- `addEventListener` for events
- `createElement` and `innerHTML`
- `classList.add`, `classList.remove`, `classList.toggle`
- Array methods: `filter`, `sort`, `find`, `map`

### From Advanced Parts
- `localStorage` for data persistence
- `JSON.stringify` and `JSON.parse`
- `try-catch` for error handling
- Debouncing for search
- File API for export/import

---

## How to Use

1. Open `index.html` in your browser
2. Create your first note using the form
3. Click on a note to edit it
4. Use search and filters to find notes
5. Try the extra features (pin, dark mode, export)

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save note |
| `Enter` (in title) | Jump to content field |

---

## File Structure

```
advance-5/
├── index.html    # App structure and styles
├── script.js     # All JavaScript logic
├── chapter.txt   # Learning guide
└── README.md     # This file
```

---

## Code Overview

### State Management
```javascript
let notes = [];           // All notes
let selectedNoteId = null; // Currently editing
let selectedColor = '#fff9c4';
let darkMode = false;
```

### Note Object Structure
```javascript
{
    id: 1234567890,           // Unique ID (timestamp)
    title: 'My Note',
    content: 'Note content here',
    category: 'personal',
    color: '#fff9c4',
    pinned: false,
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z'
}
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `createNote()` | Add new note to array |
| `updateNote()` | Modify existing note |
| `deleteNote()` | Remove note from array |
| `renderNotes()` | Display notes in UI |
| `saveNotes()` | Save to localStorage |
| `loadNotes()` | Load from localStorage |

---

## Exercises to Try

After exploring the app, try these challenges:

### Easy
1. Change the default note color
2. Add a new category (e.g., "School")
3. Change the debounce delay from 300ms to 500ms

### Medium
4. Add a character counter for the title
5. Add a "Duplicate Note" button
6. Show the word count for each note

### Hard
7. Add tags to notes (multiple tags per note)
8. Add "Undo Delete" feature
9. Add note sharing via URL

---

## Understanding the Code

### 1. Saving to localStorage
```javascript
function saveNotes() {
    localStorage.setItem('notesApp_notes', JSON.stringify(notes));
}
```

### 2. Loading from localStorage
```javascript
function loadNotes() {
    const saved = localStorage.getItem('notesApp_notes');
    if (saved) {
        notes = JSON.parse(saved);
    }
}
```

### 3. Filtering Notes
```javascript
function getFilteredNotes() {
    let result = [...notes];

    // Search filter
    if (query) {
        result = result.filter(n =>
            n.title.toLowerCase().includes(query) ||
            n.content.toLowerCase().includes(query)
        );
    }

    // Category filter
    if (category !== 'all') {
        result = result.filter(n => n.category === category);
    }

    // Pinned notes first
    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return result;
}
```

### 4. Debounced Search
```javascript
const debouncedSearch = debounce(() => renderNotes(), 300);
searchInput.addEventListener('input', debouncedSearch);
```

### 5. Export Notes
```javascript
exportBtn.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notes.json';
    link.click();
});
```

---

## Customization Ideas

### Change Colors
Edit the color options in `index.html`:
```html
<div class="color-option" data-color="#your-color"></div>
```

### Add Categories
Add options in the HTML and update the filter:
```html
<option value="school">School</option>
```

### Change Theme Colors
Edit the CSS in `index.html` for dark mode:
```css
body.dark-mode {
    background: #1a1a1a;
}
```

---

## What You Learned

By completing this project, you practiced:

- DOM manipulation
- Event handling
- State management
- Data persistence
- Error handling
- Search and filtering
- Debouncing
- File operations
- Theme switching
- Building a complete application

---

## Congratulations!

You've completed all the advanced JavaScript modules! You now have the skills to build real web applications.

### What's Next?

- Build your own project using these concepts
- Learn a JavaScript framework (React, Vue, or Angular)
- Explore Node.js for backend development
- Practice with more API projects

---

Happy Coding!
