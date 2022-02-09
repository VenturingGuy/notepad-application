let notes = [];

updatePage();

function updatePage() {
  if (localStorage.getItem("notepad-title")){
    document.getElementById("user-notepad").innerHTML = localStorage.getItem("notepad-title");
  }
  if (localStorage.getItem("notes")){
    notes = JSON.parse(localStorage.getItem("notes"));
  }
}

function store() {
  const inputNotepad = document.getElementById("notepad-title");
  localStorage.setItem("notepad-title", inputNotepad.value);
}

function storeNote() {
  const noteTitle = document.getElementById("note-title").value;
  const noteText = document.getElementById("note-text").value;
  const newNote = {noteTitle, noteText};
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
}