let notes = [];

updatePage();

function updatePage() {
  if (localStorage.getItem("notepad-title")){
    document.getElementById("user-notepad").innerHTML = localStorage.getItem("notepad-title");
  }
  if (localStorage.getItem("notes")){
    notes = JSON.parse(localStorage.getItem("notes"));
    displayNotes();
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

function displayNotes() {
  const container = document.querySelector(".notepad__saved");
  console.log(container);

  notes.forEach(function(note){
    let noteName = document.createElement("div");
    let noteText = document.createElement("div");
    noteName.setAttribute("class", "notepad__notename");
    noteName.textContent = note.noteTitle;
    noteText.setAttribute("class", "notepad__notetext");
    noteText.textContent = note.noteText;
    container.appendChild(noteName);
    container.appendChild(noteText);
  })
}

function deleteNotepad() {
  localStorage.clear();
}