// Selecting elements
const noteInput = document.querySelector('#noteInput');
const addBtn = document.querySelector('#addBtn');
const notesContainer = document.querySelector('#notesContainer');

// 1. Load notes from localStorage on startup
let notes = JSON.parse(localStorage.getItem('my_notes')) || [];

const renderNotes = () => {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note-card');
        noteEl.innerHTML = `
            <p>${note}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteEl);
    });
    // Save to local storage every time we render
    localStorage.setItem('my_notes', JSON.stringify(notes));
};

// 2. Function to add a note
const addNote = () => {
    const text = noteInput.value.trim();
    if (text) {
        notes.push(text);
        noteInput.value = '';
        renderNotes();
    }
};

// 3. Function to delete a note
window.deleteNote = (index) => {
    notes.splice(index, 1);
    renderNotes();
};

// Event Listeners
addBtn.addEventListener('click', addNote);
noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNote();
});

// Initial render
renderNotes();