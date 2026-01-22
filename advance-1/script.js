/**
 * Advance 1: Async JavaScript & Fetch API
 *
 * Learn how to work with:
 * - setTimeout & setInterval (timers)
 * - Promises (handling async results)
 * - fetch() API (getting data from servers)
 * - async/await (modern syntax)
 */

console.log('=== Advance 1: Async JavaScript ===');

// ============================================
// EXERCISE 1: Timers
// ============================================
// setTimeout - runs code ONCE after delay
// setInterval - runs code REPEATEDLY

const delayedBtn = document.querySelector('#delayed-btn');
const delayedOutput = document.querySelector('#delayed-output');

delayedBtn.addEventListener('click', () => {
    delayedOutput.textContent = 'Waiting 2 seconds...';
    delayedOutput.className = 'output loading';

    // setTimeout(callback, milliseconds)
    // 1000ms = 1 second
    setTimeout(() => {
        delayedOutput.textContent = 'Hello! This appeared after 2 seconds!';
        delayedOutput.className = 'output success';
    }, 2000);
});


// ----- Countdown Timer -----
const countdownDisplay = document.querySelector('#countdown-display');
const startBtn = document.querySelector('#start-countdown');
const stopBtn = document.querySelector('#stop-countdown');
const resetBtn = document.querySelector('#reset-countdown');

let count = 10;
let intervalId = null;

startBtn.addEventListener('click', () => {
    if (intervalId) return; // Already running

    // setInterval runs every 1000ms (1 second)
    intervalId = setInterval(() => {
        count--;
        countdownDisplay.textContent = count;

        if (count <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            countdownDisplay.textContent = 'Done!';
        }
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    count = 10;
    countdownDisplay.textContent = '10';
});


// ============================================
// EXERCISE 2: Promises
// ============================================
// A Promise represents a future value (success or failure)
// States: pending -> fulfilled OR rejected

const promiseSuccessBtn = document.querySelector('#promise-success');
const promiseFailBtn = document.querySelector('#promise-fail');
const promiseOutput = document.querySelector('#promise-output');

// Function that returns a Promise
function doAsyncWork(willSucceed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willSucceed) {
                resolve('Success! Operation completed.');
            } else {
                reject('Failed! Something went wrong.');
            }
        }, 2000);
    });
}

promiseSuccessBtn.addEventListener('click', () => {
    promiseOutput.textContent = 'Loading...';
    promiseOutput.className = 'output loading';

    doAsyncWork(true)
        .then(result => {
            // .then() runs when promise succeeds
            promiseOutput.textContent = result;
            promiseOutput.className = 'output success';
        })
        .catch(error => {
            // .catch() runs when promise fails
            promiseOutput.textContent = error;
            promiseOutput.className = 'output error';
        });
});

promiseFailBtn.addEventListener('click', () => {
    promiseOutput.textContent = 'Loading...';
    promiseOutput.className = 'output loading';

    doAsyncWork(false)
        .then(result => {
            promiseOutput.textContent = result;
            promiseOutput.className = 'output success';
        })
        .catch(error => {
            promiseOutput.textContent = error;
            promiseOutput.className = 'output error';
        });
});


// ----- Promise Chain -----
const promiseChainBtn = document.querySelector('#promise-chain');
const chainOutput = document.querySelector('#chain-output');

function step(num, delay) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Step ${num} done`), delay);
    });
}

promiseChainBtn.addEventListener('click', () => {
    chainOutput.textContent = 'Starting...\n';
    chainOutput.className = 'output loading';

    // Chaining: each .then() waits for the previous
    step(1, 1000)
        .then(result => {
            chainOutput.textContent += result + '\n';
            return step(2, 1000);
        })
        .then(result => {
            chainOutput.textContent += result + '\n';
            return step(3, 1000);
        })
        .then(result => {
            chainOutput.textContent += result + '\nAll done!';
            chainOutput.className = 'output success';
        });
});


// ============================================
// EXERCISE 3: Fetch API
// ============================================
// fetch() makes HTTP requests to servers
// Returns a Promise

const fetchUsersBtn = document.querySelector('#fetch-users');
const usersContainer = document.querySelector('#users-container');
const usersOutput = document.querySelector('#users-output');

fetchUsersBtn.addEventListener('click', () => {
    usersOutput.textContent = 'Fetching...';
    usersOutput.className = 'output loading';
    usersContainer.innerHTML = '';

    // fetch(url) returns a Promise
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())  // Parse JSON
        .then(users => {
            usersOutput.textContent = `Loaded ${users.length} users!`;
            usersOutput.className = 'output success';

            // Show first 5 users
            users.slice(0, 5).forEach(user => {
                const card = document.createElement('div');
                card.className = 'user-card';
                card.innerHTML = `
                    <div class="info">
                        <strong>${user.name}</strong><br>
                        <small>@${user.username}</small><br>
                        <small>${user.email}</small>
                    </div>
                `;
                usersContainer.appendChild(card);
            });
        })
        .catch(error => {
            usersOutput.textContent = 'Error: ' + error.message;
            usersOutput.className = 'output error';
        });
});


// ----- Fetch Single User -----
const userIdInput = document.querySelector('#user-id-input');
const fetchSingleBtn = document.querySelector('#fetch-single-user');
const singleOutput = document.querySelector('#single-user-output');

fetchSingleBtn.addEventListener('click', () => {
    const id = userIdInput.value;

    if (!id || id < 1 || id > 10) {
        singleOutput.textContent = 'Enter ID between 1-10';
        singleOutput.className = 'output error';
        return;
    }

    singleOutput.textContent = 'Fetching...';
    singleOutput.className = 'output loading';

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(user => {
            singleOutput.innerHTML = `
<b>Name:</b> ${user.name}
<b>Email:</b> ${user.email}
<b>Phone:</b> ${user.phone}
<b>City:</b> ${user.address.city}
            `;
            singleOutput.className = 'output success';
        })
        .catch(error => {
            singleOutput.textContent = 'Error: ' + error.message;
            singleOutput.className = 'output error';
        });
});


// ============================================
// EXERCISE 4: Fetch Posts
// ============================================

const fetchPostsBtn = document.querySelector('#fetch-posts');
const postsContainer = document.querySelector('#posts-container');
const postsOutput = document.querySelector('#posts-output');

fetchPostsBtn.addEventListener('click', () => {
    postsOutput.textContent = 'Fetching...';
    postsOutput.className = 'output loading';
    postsContainer.innerHTML = '';

    // ?_limit=5 gets only 5 results
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(response => response.json())
        .then(posts => {
            postsOutput.textContent = `Loaded ${posts.length} posts!`;
            postsOutput.className = 'output success';

            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'post-card';
                card.innerHTML = `
                    <h4>${post.title}</h4>
                    <p>${post.body}</p>
                `;
                postsContainer.appendChild(card);
            });
        })
        .catch(error => {
            postsOutput.textContent = 'Error: ' + error.message;
            postsOutput.className = 'output error';
        });
});


// ============================================
// EXERCISE 5: Async/Await
// ============================================
// async/await is a cleaner way to write Promises
// async function always returns a Promise
// await pauses until Promise resolves

const asyncFetchBtn = document.querySelector('#async-fetch');
const asyncOutput = document.querySelector('#async-output');

async function fetchUserAsync() {
    try {
        asyncOutput.textContent = 'Fetching...';
        asyncOutput.className = 'output loading';

        // await pauses until fetch completes
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await response.json();

        asyncOutput.innerHTML = `
<b>Name:</b> ${user.name}
<b>Email:</b> ${user.email}
<b>City:</b> ${user.address.city}
        `;
        asyncOutput.className = 'output success';

    } catch (error) {
        asyncOutput.textContent = 'Error: ' + error.message;
        asyncOutput.className = 'output error';
    }
}

asyncFetchBtn.addEventListener('click', fetchUserAsync);


// ----- Parallel Fetch with Promise.all -----
const parallelBtn = document.querySelector('#parallel-fetch');
const parallelOutput = document.querySelector('#parallel-output');

async function fetchParallel() {
    try {
        parallelOutput.textContent = 'Fetching both...';
        parallelOutput.className = 'output loading';

        // Promise.all runs multiple fetches at the same time!
        const [usersRes, postsRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        ]);

        const users = await usersRes.json();
        const posts = await postsRes.json();

        parallelOutput.innerHTML = `
<b>Parallel fetch complete!</b>
Users: ${users.length}
Posts: ${posts.length}
First user: ${users[0].name}
        `;
        parallelOutput.className = 'output success';

    } catch (error) {
        parallelOutput.textContent = 'Error: ' + error.message;
        parallelOutput.className = 'output error';
    }
}

parallelBtn.addEventListener('click', fetchParallel);


// ============================================
// EXERCISE 6: Promise.race
// ============================================
// Promise.race - first to finish wins!

const raceBtn = document.querySelector('#promise-race');
const raceOutput = document.querySelector('#race-output');

function slowTask(name, time) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`${name} finished in ${time}ms`), time);
    });
}

raceBtn.addEventListener('click', async () => {
    raceOutput.textContent = 'Racing...';
    raceOutput.className = 'output loading';

    // First promise to finish wins
    const winner = await Promise.race([
        slowTask('Fast', 500),
        slowTask('Medium', 1000),
        slowTask('Slow', 1500)
    ]);

    raceOutput.textContent = winner;
    raceOutput.className = 'output success';
});


// ----- Timeout Pattern -----
const timeoutBtn = document.querySelector('#timeout-fetch');
const timeoutOutput = document.querySelector('#timeout-output');

function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout!')), ms);
    });
}

timeoutBtn.addEventListener('click', async () => {
    timeoutOutput.textContent = 'Fetching with 1s timeout...';
    timeoutOutput.className = 'output loading';

    try {
        // Race between fetch and timeout
        const response = await Promise.race([
            fetch('https://jsonplaceholder.typicode.com/users'),
            timeout(1000)
        ]);

        const data = await response.json();
        timeoutOutput.textContent = `Got ${data.length} users before timeout!`;
        timeoutOutput.className = 'output success';

    } catch (error) {
        timeoutOutput.textContent = error.message;
        timeoutOutput.className = 'output error';
    }
});


// ============================================
// EXERCISE 7: AbortController
// ============================================
// Cancel ongoing fetch requests

const startFetchBtn = document.querySelector('#start-fetch');
const cancelFetchBtn = document.querySelector('#cancel-fetch');
const abortOutput = document.querySelector('#abort-output');

let controller = null;

startFetchBtn.addEventListener('click', async () => {
    controller = new AbortController();

    abortOutput.textContent = 'Fetching... Click Cancel to stop!';
    abortOutput.className = 'output loading';

    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users',
            { signal: controller.signal }
        );

        // Add delay so you have time to cancel
        await new Promise(r => setTimeout(r, 2000));

        const data = await response.json();
        abortOutput.textContent = `Got ${data.length} users!`;
        abortOutput.className = 'output success';

    } catch (error) {
        if (error.name === 'AbortError') {
            abortOutput.textContent = 'Request cancelled!';
        } else {
            abortOutput.textContent = 'Error: ' + error.message;
        }
        abortOutput.className = 'output error';
    }
});

cancelFetchBtn.addEventListener('click', () => {
    if (controller) {
        controller.abort();
        controller = null;
    }
});


// ============================================
// EXERCISE 8: Execution Order
// ============================================
// Understand how JavaScript runs async code

const orderBtn = document.querySelector('#execution-order');
const orderOutput = document.querySelector('#order-output');

orderBtn.addEventListener('click', () => {
    let steps = [];

    // 1. Sync code runs first
    steps.push('1. Sync: START');

    // 2. setTimeout runs last (macrotask)
    setTimeout(() => {
        steps.push('4. setTimeout');
        orderOutput.textContent = steps.join('\n');
    }, 0);

    // 3. Promise runs before setTimeout (microtask)
    Promise.resolve().then(() => {
        steps.push('3. Promise.then');
    });

    // 4. More sync code
    steps.push('2. Sync: END');

    // Show result after a moment
    setTimeout(() => {
        orderOutput.textContent = steps.join('\n') + '\n\n✓ Order: Sync → Promise → setTimeout';
        orderOutput.className = 'output success';
    }, 100);
});


console.log('Advance 1 loaded! Try each exercise.');
