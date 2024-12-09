// DOM elements
const eventForm = document.getElementById('calendarForm');
const eventList = document.getElementById('eventList');

// Load events from local storage
function loadEvents() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  eventList.innerHTML = ''; // Clear the current list
  
  events.forEach((event, index) => {
    const li = document.createElement('li');
    li.textContent = `${event.date}: ${event.title}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteEvent(index);
      showNotification("info", "Event deleted successfully!");
    });
    
    li.appendChild(deleteButton);
    eventList.appendChild(li);
  });

  checkUpcomingEvents(); // Check for upcoming events
}

// Save event to local storage
function saveEvent(eventTitle, eventDate) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.push({ title: eventTitle, date: eventDate });
  localStorage.setItem('events', JSON.stringify(events));
  loadEvents();
  showNotification("success", "Event added successfully!");
}

// Delete event from local storage
function deleteEvent(index) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.splice(index, 1); // Remove the event
  localStorage.setItem('events', JSON.stringify(events));
  loadEvents();
}

// Check for upcoming events and show notifications
function checkUpcomingEvents() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const today = new Date().toISOString().split("T")[0]; // Format as yyyy-mm-dd
  
  events.forEach(event => {
    if (event.date === today) {
      showNotification("info", `Reminder: ${event.title} is scheduled for today!`);
    }
  });
}

// Handle form submission
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  
  if (!title || !date) {
    showNotification("error", "Please fill out all fields!");
    return;
  }
  
  saveEvent(title, date);
  eventForm.reset(); // Clear the form
});

// Notification system
function showNotification(type, message) {
  const container = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `<span>${message}</span>`;
  container.appendChild(notification);

  // Automatically remove the notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "fadeOut 0.3s ease";
    notification.addEventListener("animationend", () => notification.remove());
  }, 3000);
}

// Load events on page load
document.addEventListener('DOMContentLoaded', loadEvents);
