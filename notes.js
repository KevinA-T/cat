// Notes Section
const noteInput = document.getElementById("note-input");
const addNoteBtn = document.getElementById("add-note-btn");
const notesList = document.getElementById("notes-list");

// To-Do Section
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

// Load notes and to-do list from localStorage
function loadItems() {
  // Load notes
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(note => addNoteToUI(note));

  // Load to-do items
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(todo => addTodoToUI(todo));
}

// Add note to UI and localStorage
function addNoteToUI(note) {
  const li = document.createElement("li");
  li.textContent = note;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveNotes();
  };
  li.appendChild(deleteBtn);
  notesList.appendChild(li);
}

// Add to-do to UI and localStorage
function addTodoToUI(todo) {
  const li = document.createElement("li");
  li.textContent = todo;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Done";
  deleteBtn.onclick = () => {
    li.remove();
    saveTodos();
  };
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Save notes to localStorage
function saveNotes() {
  const notes = Array.from(notesList.children).map(li => li.firstChild.textContent);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Save to-dos to localStorage
function saveTodos() {
  const todos = Array.from(todoList.children).map(li => li.firstChild.textContent);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listeners for adding notes and to-dos
addNoteBtn.addEventListener("click", () => {
  if (noteInput.value.trim() !== "") {
    addNoteToUI(noteInput.value.trim());
    saveNotes();
    noteInput.value = ""; // Clear the input field
  }
});

addTodoBtn.addEventListener("click", () => {
  if (todoInput.value.trim() !== "") {
    addTodoToUI(todoInput.value.trim());
    saveTodos();
    todoInput.value = ""; // Clear the input field
  }
});

// Load items when the page loads
loadItems();
