let notepads = [{
    notepadTitle: "",
    notes: []
}];


updatePage();

function updatePage() {
  if (localStorage.getItem("notepads")){
    notepads = JSON.parse(localStorage.getItem("notepads"));
  }
  listNotepads();
}

function storeNotepad() {
  const notepadTitle = document.getElementById("notepad-title").value;
  const newIndex = notepads.length === 1 ? notepads.length - 1 : notepads.length;
  console.log(notepads);
  console.log(notepads[newIndex]);
  let notes = storeNote();
  notepads[0].notepadTitle === "" ? notepads[0] = {notepadTitle, notes} : notepads.push({notepadTitle, notes});
  localStorage.setItem("notepads", JSON.stringify(notepads));
}

function storeNote() {
  const noteTitle = document.getElementById("note-title").value;
  const noteText = document.getElementById("note-text").value;
  const newNote = [{noteTitle, noteText}];
  return newNote;
}

function listNotepads() {
  const container = document.querySelector(".notepad__savednotepads");
  const button = document.createElement("button");
  button.setAttribute("class", "notepad__buton");
  button.innerHTML = "New Notepad";
  button.onclick = () => {
    document.querySelector(".notepad__creation").toggleAttribute("hidden");
    button.innerHTML = (button.innerHTML === "New Notepad" ? button.innerHTML = "Cancel" : button.innerHTML = "New Notepad");
  }
  if (localStorage.getItem("notepads")){
    notepads.forEach(function(notepad, index){
      const notepadName = document.createElement("div");
      notepadName.setAttribute("class", "notepad__entry");
      notepadName.setAttribute("id", `notepad-${index}`);
      notepadName.onclick = () => {
        document.getElementById(`saved-${index}`).toggleAttribute("hidden")
      };
      notepadName.innerHTML = notepad.notepadTitle;
      container.appendChild(notepadName);
      displayNotepad(index);
    })
  }
  container.appendChild(button);
}

function displayNotepad(index) {
  const container = document.getElementById(`notepad-${index}`);
  console.log(notepads[index].notes);
  const title=document.createElement("div");
  title.setAttribute("class", "notepad__saved");
  title.setAttribute("id", `saved-${index}`);
  title.setAttribute("hidden", "hidden");
  container.appendChild(title);
  displayNotes(index);
}

function displayNotes(index) {
  const container = document.getElementById(`saved-${index}`);
  const currentNotepad = notepads[index];
  console.log(currentNotepad);
  console.log(currentNotepad.notes);

  currentNotepad.notes.forEach(note => {
    const noteName = document.createElement("div");
    const noteText = document.createElement("div");
    noteName.setAttribute("class", "notepad__notename");
    noteName.textContent = note.noteTitle;
    noteText.setAttribute("class", "notepad__notetext");
    noteText.textContent = note.noteText;
    container.appendChild(noteName);
    container.appendChild(noteText);
  });
}

function deleteNotepad() {
  localStorage.clear();
}