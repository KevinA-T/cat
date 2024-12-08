// calendar-script.js

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
    deleteButton.addEventListener('click', () => deleteEvent(index));
    
    li.appendChild(deleteButton);
    eventList.appendChild(li);
  });
}

// Save event to local storage
function saveEvent(eventTitle, eventDate) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.push({ title: eventTitle, date: eventDate });
  localStorage.setItem('events', JSON.stringify(events));
  loadEvents();
}

// Delete event from local storage
function deleteEvent(index) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.splice(index, 1); // Remove the event
  localStorage.setItem('events', JSON.stringify(events));
  loadEvents();
}

// Handle form submission
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  
  saveEvent(title, date);
  eventForm.reset(); // Clear the form
});

// Load events on page load
document.addEventListener('DOMContentLoaded', loadEvents);
