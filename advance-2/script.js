/**
 * Advance 2: Local Storage & Data Persistence
 *
 * Learn how to:
 * - Save data in the browser (localStorage)
 * - Data persists even after closing the browser
 * - Store objects using JSON
 */

console.log('=== Advance 2: Local Storage ===');

// ============================================
// EXERCISE 1: Basic localStorage
// ============================================
// localStorage.setItem(key, value) - Save
// localStorage.getItem(key) - Get (returns string or null)
// localStorage.removeItem(key) - Delete one
// localStorage.clear() - Delete all

const keyInput = document.querySelector('#key-input');
const valueInput = document.querySelector('#value-input');
const saveBtn = document.querySelector('#save-btn');
const getBtn = document.querySelector('#get-btn');
const basicOutput = document.querySelector('#basic-output');
const viewAllBtn = document.querySelector('#view-all-btn');
const clearAllBtn = document.querySelector('#clear-all-btn');
const storageItems = document.querySelector('#storage-items');

// Save to localStorage
saveBtn.addEventListener('click', () => {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();

    if (!key || !value) {
        basicOutput.textContent = 'Enter both key and value!';
        return;
    }

    localStorage.setItem(key, value);
    basicOutput.textContent = `Saved: "${key}" = "${value}"`;

    keyInput.value = '';
    valueInput.value = '';
});

// Get from localStorage
getBtn.addEventListener('click', () => {
    const key = keyInput.value.trim();

    if (!key) {
        basicOutput.textContent = 'Enter a key to get!';
        return;
    }

    const value = localStorage.getItem(key);

    if (value !== null) {
        basicOutput.textContent = `Found: "${key}" = "${value}"`;
    } else {
        basicOutput.textContent = `Key "${key}" not found`;
    }
});

// View all items
function showAllItems() {
    storageItems.innerHTML = '';

    if (localStorage.length === 0) {
        storageItems.innerHTML = '<p>No items stored</p>';
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        const div = document.createElement('div');
        div.className = 'storage-item';
        div.innerHTML = `
            <span><b>${key}:</b> ${value}</span>
            <button onclick="deleteItem('${key}')">Delete</button>
        `;
        storageItems.appendChild(div);
    }
}

viewAllBtn.addEventListener('click', showAllItems);

// Delete one item
window.deleteItem = function(key) {
    localStorage.removeItem(key);
    showAllItems();
};

// Clear all
clearAllBtn.addEventListener('click', () => {
    if (confirm('Delete ALL data?')) {
        localStorage.clear();
        storageItems.innerHTML = '<p>All cleared!</p>';
        basicOutput.textContent = 'All data cleared!';
    }
});


// ============================================
// EXERCISE 2: Save User Preferences
// ============================================
// IMPORTANT: localStorage only stores STRINGS!
// Use JSON.stringify() to save objects
// Use JSON.parse() to get objects back

const prefName = document.querySelector('#pref-name');
const prefColor = document.querySelector('#pref-color');
const prefFontSize = document.querySelector('#pref-font-size');
const savePrefsBtn = document.querySelector('#save-prefs-btn');
const loadPrefsBtn = document.querySelector('#load-prefs-btn');
const resetPrefsBtn = document.querySelector('#reset-prefs-btn');
const themePreview = document.querySelector('#theme-preview');

const defaultPrefs = {
    name: 'User',
    color: '#11998e',
    fontSize: '16'
};

function applyPrefs(prefs) {
    themePreview.style.backgroundColor = prefs.color;
    themePreview.style.fontSize = prefs.fontSize + 'px';
    themePreview.textContent = `Hello, ${prefs.name}!`;
}

savePrefsBtn.addEventListener('click', () => {
    const prefs = {
        name: prefName.value || 'User',
        color: prefColor.value,
        fontSize: prefFontSize.value
    };

    // Convert object to string before saving
    localStorage.setItem('userPrefs', JSON.stringify(prefs));
    applyPrefs(prefs);
    alert('Preferences saved!');
});

loadPrefsBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('userPrefs');

    if (saved) {
        // Convert string back to object
        const prefs = JSON.parse(saved);

        prefName.value = prefs.name;
        prefColor.value = prefs.color;
        prefFontSize.value = prefs.fontSize;

        applyPrefs(prefs);
    } else {
        alert('No saved preferences found');
    }
});

resetPrefsBtn.addEventListener('click', () => {
    localStorage.removeItem('userPrefs');
    prefName.value = '';
    prefColor.value = defaultPrefs.color;
    prefFontSize.value = defaultPrefs.fontSize;
    applyPrefs(defaultPrefs);
});

// Load prefs on page load
const savedPrefs = localStorage.getItem('userPrefs');
if (savedPrefs) {
    const prefs = JSON.parse(savedPrefs);
    prefName.value = prefs.name;
    prefColor.value = prefs.color;
    prefFontSize.value = prefs.fontSize;
    applyPrefs(prefs);
}


// ============================================
// EXERCISE 3: Persistent Visit Counter
// ============================================

const visitCount = document.querySelector('#visit-count');
const clickCount = document.querySelector('#click-count');
const sessionTime = document.querySelector('#session-time');
const clickBtn = document.querySelector('#increment-clicks');
const resetStatsBtn = document.querySelector('#reset-stats');

// Increment visit count
let visits = parseInt(localStorage.getItem('visits') || '0');
visits++;
localStorage.setItem('visits', visits);
visitCount.textContent = visits;

// Click counter
let clicks = parseInt(localStorage.getItem('clicks') || '0');
clickCount.textContent = clicks;

clickBtn.addEventListener('click', () => {
    clicks++;
    localStorage.setItem('clicks', clicks);
    clickCount.textContent = clicks;
});

// Session timer
let seconds = 0;
setInterval(() => {
    seconds++;
    sessionTime.textContent = seconds;
}, 1000);

resetStatsBtn.addEventListener('click', () => {
    localStorage.setItem('visits', '0');
    localStorage.setItem('clicks', '0');
    visitCount.textContent = '0';
    clickCount.textContent = '0';
    clicks = 0;
});


// ============================================
// EXERCISE 4: Search History
// ============================================

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const historyList = document.querySelector('#history-list');
const clearHistoryBtn = document.querySelector('#clear-history-btn');

function showHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    if (history.length === 0) {
        historyList.innerHTML = '<p>No searches yet</p>';
        return;
    }

    historyList.innerHTML = history.map(item =>
        `<div class="history-item">${item}</div>`
    ).join('');
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) return;

    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    // Add to beginning, keep max 10
    history.unshift(query);
    history = history.slice(0, 10);

    localStorage.setItem('searchHistory', JSON.stringify(history));
    searchInput.value = '';
    showHistory();
});

clearHistoryBtn.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    showHistory();
});

showHistory();


// ============================================
// EXERCISE 5: Contacts (JSON Storage)
// ============================================

const contactName = document.querySelector('#contact-name');
const contactEmail = document.querySelector('#contact-email');
const contactPhone = document.querySelector('#contact-phone');
const addContactBtn = document.querySelector('#add-contact-btn');
const contactsList = document.querySelector('#contacts-list');
const contactsOutput = document.querySelector('#contacts-output');

function showContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

    contactsOutput.textContent = `Stored JSON:\n${JSON.stringify(contacts, null, 2)}`;

    if (contacts.length === 0) {
        contactsList.innerHTML = '<p>No contacts</p>';
        return;
    }

    contactsList.innerHTML = contacts.map((c, i) => `
        <div class="storage-item">
            <span><b>${c.name}</b> - ${c.email} - ${c.phone}</span>
            <button onclick="deleteContact(${i})">Delete</button>
        </div>
    `).join('');
}

addContactBtn.addEventListener('click', () => {
    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const phone = contactPhone.value.trim();

    if (!name || !email) {
        alert('Name and email required');
        return;
    }

    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ name, email, phone });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    contactName.value = '';
    contactEmail.value = '';
    contactPhone.value = '';

    showContacts();
});

window.deleteContact = function(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    showContacts();
};

showContacts();


// ============================================
// EXERCISE 6: localStorage vs sessionStorage
// ============================================
// localStorage - stays forever
// sessionStorage - clears when tab closes

const dualInput = document.querySelector('#dual-input');
const saveBothBtn = document.querySelector('#save-both-btn');
const checkBothBtn = document.querySelector('#check-both-btn');
const clearBothBtn = document.querySelector('#clear-both-btn');
const localValue = document.querySelector('#local-value');
const sessionValue = document.querySelector('#session-value');

saveBothBtn.addEventListener('click', () => {
    const value = dualInput.value.trim();
    if (!value) return;

    localStorage.setItem('testValue', value);
    sessionStorage.setItem('testValue', value);

    localValue.textContent = value;
    sessionValue.textContent = value;

    alert('Saved to both! Close tab and reopen to see the difference.');
});

checkBothBtn.addEventListener('click', () => {
    localValue.textContent = localStorage.getItem('testValue') || 'Empty';
    sessionValue.textContent = sessionStorage.getItem('testValue') || 'Empty';
});

clearBothBtn.addEventListener('click', () => {
    localStorage.removeItem('testValue');
    sessionStorage.removeItem('testValue');
    localValue.textContent = 'Empty';
    sessionValue.textContent = 'Empty';
});

// Show values on load
localValue.textContent = localStorage.getItem('testValue') || 'Empty';
sessionValue.textContent = sessionStorage.getItem('testValue') || 'Empty';


// ============================================
// EXERCISE 7: Storage Events (Cross-Tab)
// ============================================
// When localStorage changes in another tab, we get an event

const messageInput = document.querySelector('#message-input');
const sendMessageBtn = document.querySelector('#send-message-btn');
const messagesOutput = document.querySelector('#messages-output');

sendMessageBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (!message) return;

    // This will trigger 'storage' event in OTHER tabs
    localStorage.setItem('crossTabMessage', message + ' (' + new Date().toLocaleTimeString() + ')');
    messageInput.value = '';
});

// Listen for changes from other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'crossTabMessage') {
        messagesOutput.innerHTML += `<div>Received: ${e.newValue}</div>`;
    }
});


// ============================================
// EXERCISE 8: Data with Expiration
// ============================================
// Store data that expires after a time

const expiryKey = document.querySelector('#expiry-key');
const expiryValue = document.querySelector('#expiry-value');
const expiryTime = document.querySelector('#expiry-time');
const saveExpiryBtn = document.querySelector('#save-expiry-btn');
const getExpiryBtn = document.querySelector('#get-expiry-btn');
const expiryOutput = document.querySelector('#expiry-output');

// Save with expiration time
function saveWithExpiry(key, value, seconds) {
    const data = {
        value: value,
        expiry: Date.now() + (seconds * 1000)
    };
    localStorage.setItem(key, JSON.stringify(data));
}

// Get and check if expired
function getWithExpiry(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const data = JSON.parse(item);

    if (Date.now() > data.expiry) {
        localStorage.removeItem(key);
        return null; // Expired!
    }

    return data.value;
}

saveExpiryBtn.addEventListener('click', () => {
    const key = expiryKey.value.trim();
    const value = expiryValue.value.trim();
    const seconds = parseInt(expiryTime.value);

    if (!key || !value) return;

    saveWithExpiry(key, value, seconds);
    expiryOutput.textContent = `Saved "${key}" for ${seconds} seconds`;
});

getExpiryBtn.addEventListener('click', () => {
    const key = expiryKey.value.trim();
    if (!key) return;

    const value = getWithExpiry(key);

    if (value) {
        expiryOutput.textContent = `Found: "${key}" = "${value}"`;
    } else {
        expiryOutput.textContent = `"${key}" not found or expired`;
    }
});


console.log('Advance 2 loaded! Try each exercise.');
