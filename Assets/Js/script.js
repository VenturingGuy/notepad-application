let notepads = {
    notepadTitles: [],
    notes: []
};


updatePage();

function updatePage() {
  if (localStorage.getItem("notepads")){
    notepads = JSON.parse(localStorage.getItem("notepads"));
    document.getElementById("user-notepad").innerText = notepads.notepadTitles[0];
    
    displayNotes();
  }
}

function storeNotepad() {
  const notepadTitle = document.getElementById("notepad-title").value;
  console.log(notepads.notepadTitles);
  notepads.notepadTitles.push(notepadTitle);
  localStorage.setItem("notepads", JSON.stringify(notepads));
  storeNote();
}

function storeNote() {
  console.log(notepads.notes)
  const noteTitle = document.getElementById("note-title").value;
  const noteText = document.getElementById("note-text").value;
  const newNote = {noteTitle, noteText};
  notepads.notes.push(newNote);
  localStorage.setItem("notepads", JSON.stringify(notepads));
}

function displayNotes() {
  const container = document.querySelector(".notepad__saved");

  notepads.notes.forEach(function(note){
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