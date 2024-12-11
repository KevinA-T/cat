// Timer and session control variables
let timerInterval = null;
let isStudySession = true;
let currentTime = 0; // Keeps track of the remaining time
let isPaused = false;

// Select DOM elements
const statusEl = document.getElementById("status");
const countdownEl = document.getElementById("countdown");
const studyTimeInput = document.getElementById("studyTimeInput");
const breakTimeInput = document.getElementById("breakTimeInput");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

// Function to show a custom notification
function showNotification(message, type = "info") {
  let notificationContainer = document.getElementById("notification-container");
  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    document.body.appendChild(notificationContainer);
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  // Automatically remove the notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Format time (MM:SS)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Update the timer display
function updateTimerDisplay(seconds) {
  countdownEl.textContent = formatTime(seconds);
}

// Start or resume the timer
function startTimer() {
  if (!isPaused) {
    // If the timer is not paused, initialize the time
    const studyTime = parseInt(studyTimeInput.value) * 60; // Convert minutes to seconds
    const breakTime = parseInt(breakTimeInput.value) * 60; // Convert minutes to seconds
    currentTime = isStudySession ? studyTime : breakTime;
  }

  statusEl.textContent = isStudySession ? "Study Session" : "Break Time";
  updateTimerDisplay(currentTime);

  // Start the countdown
  timerInterval = setInterval(() => {
    currentTime--;
    updateTimerDisplay(currentTime);

    if (currentTime <= 0) {
      clearInterval(timerInterval);
      isStudySession = !isStudySession; // Toggle session
      showNotification(isStudySession ? "Time to study!" : "Time for a break!", "success");
      isPaused = false; // Reset pause state for the next session
      startTimer(); // Automatically start the next session
    }
  }, 1000);

  // Disable/Enable buttons
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  showNotification("Timer started!", "info");
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
  statusEl.textContent = "Paused";
  startButton.disabled = false;
  stopButton.disabled = true;
  showNotification("Timer paused.", "info");
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  isStudySession = true;
  isPaused = false;
  
  // Reset the timer display to the input values
  const studyTime = parseInt(studyTimeInput.value) * 60; // Convert minutes to seconds
  currentTime = studyTime;
  updateTimerDisplay(currentTime);

  statusEl.textContent = "Timer Reset";
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  showNotification("Timer reset!", "warning");
}

// Attach event listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Select the notification sound element
const notificationSound = document.getElementById("notificationSound");

// Play notification sound
function playNotificationSound() {
  notificationSound.currentTime = 0; // Reset to start
  notificationSound.play().catch(error => console.error("Error playing sound:", error));
}

// Updated startTimer to include sound when the timer ends
function startTimer() {
  if (!isPaused) {
    // Initialize time
    const studyTime = parseInt(studyTimeInput.value) * 60; // Convert minutes to seconds
    const breakTime = parseInt(breakTimeInput.value) * 60; // Convert minutes to seconds
    currentTime = isStudySession ? studyTime : breakTime;
  }

  statusEl.textContent = isStudySession ? "Study Session" : "Break Time";
  updateTimerDisplay(currentTime);

  // Start the countdown
  timerInterval = setInterval(() => {
    currentTime--;
    updateTimerDisplay(currentTime);

    if (currentTime <= 0) {
      clearInterval(timerInterval);

      // Play sound and show notification
      playNotificationSound();
      showNotification(isStudySession ? "Time for a break!" : "Time to study!", "success");

      // Switch session type and restart timer
      isStudySession = !isStudySession;
      isPaused = false;
      startTimer(); // Automatically start the next session
    }
  }, 1000);

  // Button states
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  showNotification("Timer started!", "info");
}
