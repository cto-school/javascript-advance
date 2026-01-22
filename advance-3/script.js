/**
 * Advance 3: Error Handling & Form Validation
 *
 * Learn how to:
 * - Handle errors with try-catch
 * - Throw custom errors
 * - Validate form inputs
 * - Show user-friendly error messages
 */

console.log('=== Advance 3: Error Handling ===');

// ============================================
// EXERCISE 1: Try-Catch
// ============================================
// try { risky code } catch (error) { handle error }

const jsonInput = document.querySelector('#json-input');
const parseJsonBtn = document.querySelector('#parse-json-btn');
const jsonOutput = document.querySelector('#json-output');

parseJsonBtn.addEventListener('click', () => {
    const text = jsonInput.value.trim();

    try {
        // This might fail if JSON is invalid
        const data = JSON.parse(text);
        jsonOutput.textContent = 'Parsed: ' + JSON.stringify(data, null, 2);
        jsonOutput.className = 'output success';
    } catch (error) {
        // Catch the error and show message
        jsonOutput.textContent = 'Error: ' + error.message;
        jsonOutput.className = 'output error';
    }
});


// ----- Division -----
const numA = document.querySelector('#num-a');
const numB = document.querySelector('#num-b');
const divideBtn = document.querySelector('#divide-btn');
const divideOutput = document.querySelector('#divide-output');

divideBtn.addEventListener('click', () => {
    try {
        const a = parseFloat(numA.value);
        const b = parseFloat(numB.value);

        if (isNaN(a) || isNaN(b)) {
            throw new Error('Please enter valid numbers');
        }

        if (b === 0) {
            throw new Error('Cannot divide by zero!');
        }

        const result = a / b;
        divideOutput.textContent = `${a} ÷ ${b} = ${result}`;
        divideOutput.className = 'output success';

    } catch (error) {
        divideOutput.textContent = 'Error: ' + error.message;
        divideOutput.className = 'output error';
    }
});


// ============================================
// EXERCISE 2: Form Validation
// ============================================

const regForm = document.querySelector('#registration-form');
const regUsername = document.querySelector('#reg-username');
const regEmail = document.querySelector('#reg-email');
const regPassword = document.querySelector('#reg-password');
const regConfirm = document.querySelector('#reg-confirm');
const formOutput = document.querySelector('#form-output');
const passwordStrength = document.querySelector('#password-strength');

// Validate on input
regUsername.addEventListener('input', () => {
    const valid = regUsername.value.length >= 3;
    regUsername.className = valid ? 'valid' : 'invalid';
    document.querySelector('#username-error').className = valid ? 'error-message' : 'error-message show';
});

regEmail.addEventListener('input', () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.value);
    regEmail.className = valid ? 'valid' : 'invalid';
    document.querySelector('#email-error').className = valid ? 'error-message' : 'error-message show';
});

regPassword.addEventListener('input', () => {
    const pass = regPassword.value;
    const valid = pass.length >= 8;
    regPassword.className = valid ? 'valid' : 'invalid';
    document.querySelector('#password-error').className = valid ? 'error-message' : 'error-message show';

    // Show strength
    if (pass.length === 0) {
        passwordStrength.className = 'password-strength';
    } else if (pass.length < 6) {
        passwordStrength.className = 'password-strength strength-weak';
    } else if (pass.length < 10) {
        passwordStrength.className = 'password-strength strength-medium';
    } else {
        passwordStrength.className = 'password-strength strength-strong';
    }
});

regConfirm.addEventListener('input', () => {
    const valid = regConfirm.value === regPassword.value && regConfirm.value.length > 0;
    regConfirm.className = valid ? 'valid' : 'invalid';
    document.querySelector('#confirm-error').className = valid ? 'error-message' : 'error-message show';
});

regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check all validations
    const usernameValid = regUsername.value.length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.value);
    const passwordValid = regPassword.value.length >= 8;
    const confirmValid = regConfirm.value === regPassword.value;

    if (usernameValid && emailValid && passwordValid && confirmValid) {
        formOutput.textContent = 'Registration successful!';
        formOutput.className = 'output success';
    } else {
        formOutput.textContent = 'Please fix the errors above';
        formOutput.className = 'output error';
    }
});


// ============================================
// EXERCISE 3: Password Strength Checker
// ============================================

const checkPassword = document.querySelector('#check-password');
const strengthOutput = document.querySelector('#strength-output');
const ruleLength = document.querySelector('#rule-length');
const ruleUpper = document.querySelector('#rule-uppercase');
const ruleLower = document.querySelector('#rule-lowercase');
const ruleNumber = document.querySelector('#rule-number');
const ruleSpecial = document.querySelector('#rule-special');

checkPassword.addEventListener('input', () => {
    const pass = checkPassword.value;

    // Check each rule
    const hasLength = pass.length >= 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*]/.test(pass);

    // Update rule indicators
    ruleLength.className = hasLength ? 'valid' : 'invalid';
    ruleUpper.className = hasUpper ? 'valid' : 'invalid';
    ruleLower.className = hasLower ? 'valid' : 'invalid';
    ruleNumber.className = hasNumber ? 'valid' : 'invalid';
    ruleSpecial.className = hasSpecial ? 'valid' : 'invalid';

    // Count passed rules
    const score = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (score === 0) {
        strengthOutput.textContent = 'Enter a password';
    } else if (score <= 2) {
        strengthOutput.textContent = 'Weak password';
        strengthOutput.className = 'output error';
    } else if (score <= 4) {
        strengthOutput.textContent = 'Medium password';
        strengthOutput.className = 'output';
    } else {
        strengthOutput.textContent = 'Strong password!';
        strengthOutput.className = 'output success';
    }
});


// ============================================
// EXERCISE 4: Credit Card Validation
// ============================================

const cardNumber = document.querySelector('#card-number');
const cardExpiry = document.querySelector('#card-expiry');
const cardCvv = document.querySelector('#card-cvv');
const cardDisplay = document.querySelector('#card-display');
const expiryDisplay = document.querySelector('#expiry-display');
const cvvDisplay = document.querySelector('#cvv-display');
const cardOutput = document.querySelector('#card-output');

// Format card number with spaces
cardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    value = value.substring(0, 16); // Max 16 digits
    value = value.replace(/(\d{4})/g, '$1 ').trim(); // Add spaces

    e.target.value = value;
    cardDisplay.textContent = value || '•••• •••• •••• ••••';

    // Validate length
    const valid = value.replace(/\s/g, '').length === 16;
    cardNumber.className = valid ? 'valid' : 'invalid';
});

// Format expiry date
cardExpiry.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
    expiryDisplay.textContent = value || 'MM/YY';
});

// CVV
cardCvv.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    cvvDisplay.textContent = e.target.value || '•••';
});


// ============================================
// EXERCISE 5: Async Error Handling
// ============================================

const apiUrl = document.querySelector('#api-url');
const fetchBtn = document.querySelector('#fetch-btn');
const fetchInvalidBtn = document.querySelector('#fetch-invalid-btn');
const fetchOutput = document.querySelector('#fetch-output');

fetchBtn.addEventListener('click', async () => {
    fetchOutput.textContent = 'Fetching...';
    fetchOutput.className = 'output';

    try {
        const response = await fetch(apiUrl.value);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        fetchOutput.textContent = JSON.stringify(data, null, 2);
        fetchOutput.className = 'output success';

    } catch (error) {
        fetchOutput.textContent = 'Error: ' + error.message;
        fetchOutput.className = 'output error';
    }
});

fetchInvalidBtn.addEventListener('click', async () => {
    fetchOutput.textContent = 'Fetching invalid URL...';

    try {
        const response = await fetch('https://invalid-url-12345.com');
        const data = await response.json();
        fetchOutput.textContent = JSON.stringify(data);
    } catch (error) {
        fetchOutput.textContent = 'Error: ' + error.message;
        fetchOutput.className = 'output error';
    }
});


// ============================================
// EXERCISE 6: throw & Custom Errors
// ============================================
// throw new Error('message') - create an error
// class CustomError extends Error - custom error types

const ageInput = document.querySelector('#age-input');
const verifyAgeBtn = document.querySelector('#verify-age-btn');
const ageOutput = document.querySelector('#age-output');

verifyAgeBtn.addEventListener('click', () => {
    try {
        const age = parseInt(ageInput.value);

        if (isNaN(age)) {
            throw new Error('Please enter a valid number');
        }

        if (age < 0) {
            throw new Error('Age cannot be negative');
        }

        if (age < 18) {
            throw new Error('Must be 18 or older');
        }

        ageOutput.textContent = 'Access granted! You are ' + age;
        ageOutput.className = 'output success';

    } catch (error) {
        ageOutput.textContent = 'Error: ' + error.message;
        ageOutput.className = 'output error';
    }
});


// ----- Custom Error Types -----
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

const errorType = document.querySelector('#error-type');
const throwCustomBtn = document.querySelector('#throw-custom-btn');
const customErrorOutput = document.querySelector('#custom-error-output');

throwCustomBtn.addEventListener('click', () => {
    try {
        const type = errorType.value;

        if (type === 'validation') {
            throw new ValidationError('Invalid input data');
        } else if (type === 'auth') {
            throw new AuthError('You are not logged in');
        } else if (type === 'network') {
            throw new Error('Network connection failed');
        } else {
            throw new Error('Item not found');
        }

    } catch (error) {
        customErrorOutput.textContent = `${error.name}: ${error.message}`;
        customErrorOutput.className = 'output error';
    }
});


// ============================================
// EXERCISE 7: try-catch-finally
// ============================================
// finally block ALWAYS runs

const finallySuccessBtn = document.querySelector('#finally-success-btn');
const finallyFailBtn = document.querySelector('#finally-fail-btn');
const finallyOutput = document.querySelector('#finally-output');
const cleanupLog = document.querySelector('#cleanup-log');

finallySuccessBtn.addEventListener('click', () => {
    cleanupLog.textContent = '';

    try {
        cleanupLog.textContent += '1. Starting operation...\n';
        // Success!
        finallyOutput.textContent = 'Operation succeeded!';
        finallyOutput.className = 'output success';
        cleanupLog.textContent += '2. Operation completed\n';
    } catch (error) {
        cleanupLog.textContent += '2. Error caught\n';
        finallyOutput.textContent = 'Error: ' + error.message;
    } finally {
        // This ALWAYS runs!
        cleanupLog.textContent += '3. Finally: Cleanup done (always runs)';
    }
});

finallyFailBtn.addEventListener('click', () => {
    cleanupLog.textContent = '';

    try {
        cleanupLog.textContent += '1. Starting operation...\n';
        throw new Error('Something broke!');
    } catch (error) {
        cleanupLog.textContent += '2. Error caught\n';
        finallyOutput.textContent = 'Error: ' + error.message;
        finallyOutput.className = 'output error';
    } finally {
        cleanupLog.textContent += '3. Finally: Cleanup done (always runs)';
    }
});


// ============================================
// EXERCISE 8: Error Handling Patterns
// ============================================

// Graceful degradation - use fallback when error occurs
const gracefulBtn = document.querySelector('#graceful-btn');
const gracefulOutput = document.querySelector('#graceful-output');

gracefulBtn.addEventListener('click', async () => {
    gracefulOutput.textContent = 'Trying primary source...';

    try {
        // Try primary source (will fail)
        const response = await fetch('https://invalid-url.com/data');
        const data = await response.json();
        gracefulOutput.textContent = JSON.stringify(data);
    } catch (error) {
        // Fallback to default data
        gracefulOutput.textContent = 'Primary failed. Using fallback data:\n\n';
        gracefulOutput.textContent += JSON.stringify({
            name: 'Default User',
            message: 'This is fallback data when API fails'
        }, null, 2);
        gracefulOutput.className = 'output success';
    }
});


// Retry pattern - try again on failure
const retryBtn = document.querySelector('#retry-btn');
const retryOutput = document.querySelector('#retry-output');

async function fetchWithRetry(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            retryOutput.textContent += `Attempt ${attempt}...\n`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed');
            return await response.json();
        } catch (error) {
            if (attempt === maxRetries) throw error;
            retryOutput.textContent += `Failed, retrying...\n`;
            await new Promise(r => setTimeout(r, 500)); // Wait before retry
        }
    }
}

retryBtn.addEventListener('click', async () => {
    retryOutput.textContent = '';
    retryOutput.className = 'output';

    try {
        // This URL will fail, showing retry behavior
        const data = await fetchWithRetry('https://invalid-url-retry.com', 3);
        retryOutput.textContent += 'Success: ' + JSON.stringify(data);
        retryOutput.className = 'output success';
    } catch (error) {
        retryOutput.textContent += 'All retries failed!';
        retryOutput.className = 'output error';
    }
});


console.log('Advance 3 loaded! Try each exercise.');
