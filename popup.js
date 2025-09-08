let countEl = document.getElementById("count");
let lastUpdatedEl = document.getElementById("lastUpdated");
let incrementBtn = document.getElementById("incrementBtn");
let resetBtn = document.getElementById("resetBtn");
let nameInput = document.getElementById("name");
let greetEl = document.getElementById("greet");

// Load saved counter + last updated time + username
chrome.storage.local.get(["counter", "lastUpdated", "username"], (result) => {
  let current = result.counter || 0;
  countEl.textContent = current;
  lastUpdatedEl.textContent = result.lastUpdated || "Never";

  if (result.username) {
    greetEl.textContent = `Hello, ${result.username}! 👋`;
    nameInput.value = result.username;
  }
});

// Function to save updated values
function updateCounter(newValue) {
  let time = new Date().toLocaleString();
  chrome.storage.local.set({ counter: newValue, lastUpdated: time }, () => {
    countEl.textContent = newValue;
    lastUpdatedEl.textContent = time;
  });
}

// Increment button
incrementBtn.addEventListener("click", () => {
  chrome.storage.local.get(["counter"], (result) => {
    let newValue = (result.counter || 0) + 1;
    updateCounter(newValue);
  });
});

// Reset button
resetBtn.addEventListener("click", () => {
  updateCounter(0);
});

// Change greeting based on input
nameInput.addEventListener("input", () => {
  let username = nameInput.value.trim();
  greetEl.textContent = username ? `Hello, ${username}! 👋` : "Hello, World! 👋";
  chrome.storage.local.set({ username: username });
});
