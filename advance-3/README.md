# Advance-3: Error Handling & Form Validation

Learn how to handle errors gracefully and validate user input before processing.

---

## What You Will Learn

- How to use `try-catch-finally` blocks
- How to throw custom errors
- Creating custom Error classes
- Real-time form validation
- Using regular expressions (regex)
- Password strength checking
- Input formatting (credit cards, dates)

---

## Key Concepts

### 1. try-catch Basics

```javascript
try {
    // Code that might throw an error
    const data = JSON.parse('invalid json');
} catch (error) {
    // Handle the error
    console.log('Error:', error.message);
}
```

### 2. try-catch-finally

```javascript
try {
    // Risky code
    doSomething();
} catch (error) {
    // Handle error
    console.log('Error:', error.message);
} finally {
    // ALWAYS runs (success or error)
    cleanup();
}
```

### 3. Throwing Errors

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero!');
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (error) {
    console.log(error.message); // 'Cannot divide by zero!'
}
```

### 4. Custom Error Classes

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

throw new ValidationError('Email is invalid');
```

### 5. Form Validation

```javascript
// Validate on input
input.addEventListener('input', () => {
    if (input.value.length < 3) {
        input.classList.add('invalid');
        showError('Must be at least 3 characters');
    } else {
        input.classList.add('valid');
        hideError();
    }
});
```

### 6. Regular Expressions (Regex)

```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = emailRegex.test('user@example.com'); // true

// Password has uppercase, lowercase, number
const hasUpper = /[A-Z]/.test(password);
const hasLower = /[a-z]/.test(password);
const hasNumber = /[0-9]/.test(password);
```

---

## Exercises

| # | Exercise | Description |
|---|----------|-------------|
| 1 | JSON Parsing | Handle invalid JSON errors |
| 2 | Form Validation | Validate username, email, password |
| 3 | Password Strength | Check password against rules |
| 4 | Credit Card | Format and validate card numbers |
| 5 | Async Errors | Handle fetch errors |
| 6 | Custom Errors | Create and throw custom error types |
| 7 | Finally Block | See how finally always runs |
| 8 | Error Patterns | Retry and fallback patterns |

---

## How to Use

1. Open `index.html` in your browser
2. Open the browser console (F12)
3. Try entering invalid data to see error handling
4. Test the form validation with different inputs

---

## Common Regex Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `/^[a-zA-Z]+$/` | Letters only | `John` |
| `/^[0-9]+$/` | Numbers only | `12345` |
| `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | Email | `user@mail.com` |
| `/^\d{3}-\d{3}-\d{4}$/` | Phone | `123-456-7890` |
| `/^[A-Z]/` | Starts with uppercase | `Hello` |

---

## Validation Best Practices

### 1. Validate in Real-Time
```javascript
input.addEventListener('input', validateInput);
```

### 2. Show Clear Error Messages
```javascript
if (password.length < 8) {
    showError('Password must be at least 8 characters');
}
```

### 3. Visual Feedback
```javascript
input.classList.add('valid');   // Green border
input.classList.add('invalid'); // Red border
```

### 4. Prevent Form Submission
```javascript
form.addEventListener('submit', (e) => {
    if (!isValid) {
        e.preventDefault(); // Stop form submission
        showErrors();
    }
});
```

---

## Password Strength Checker

```javascript
function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Medium';
    return 'Strong';
}
```

---

## Error Handling Patterns

### Retry Pattern
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            if (i === maxRetries) throw error;
            console.log(`Retry ${i}...`);
        }
    }
}
```

### Fallback Pattern
```javascript
async function getData() {
    try {
        return await fetch('/api/data');
    } catch (error) {
        // Use fallback data
        return { default: true, data: [] };
    }
}
```

---

## Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| Empty catch blocks | Always log or handle errors |
| Validating only on submit | Validate in real-time too |
| Generic error messages | Be specific about what's wrong |
| Not escaping regex special chars | Use `\` to escape special characters |

---

## CSS for Validation States

```css
input.valid {
    border-color: green;
}

input.invalid {
    border-color: red;
}

.error-message {
    color: red;
    font-size: 12px;
}
```

---

## Next Steps

After completing this module, move on to **Advance-4: Working with APIs** to build real applications using external APIs.
