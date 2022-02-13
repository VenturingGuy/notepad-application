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
  const notepadTitle = document.getElementById("new-notepad-title").value;
  const newIndex = notepads.length === 1 ? notepads.length - 1 : notepads.length;
  console.log(notepads);
  console.log(notepads[newIndex]);
  let notes = storeNote();
  notepads[0].notepadTitle === "" ? notepads[0] = {notepadTitle, notes} : notepads.push({notepadTitle, notes});
  localStorage.setItem("notepads", JSON.stringify(notepads));
}

function changeNotepadName(index){
  const notepadTitle = document.getElementById(`notepad-${index}-title`).value;
  if (notepads[index].notepadTitle !== notepadTitle){
    notepads[index].notepadTitle = notepadTitle;
    localStorage.setItem("notepads", JSON.stringify(notepads));
  }
}

function changeNoteDetails() {
  const noteTitle = document.getElementById("note-title").value;
  const noteText = document.getElementById("note-text").value;
  const newNote = [{noteTitle, noteText}];
  return newNote;
}

function updateNotepad(){
  // intend to call changeNotePadName and changeNoteDetails
}

function editNotepad(index) {
  const container = document.getElementById(`notepad-${index}`);
  
  const section = document.createElement("section");
  section.setAttribute("class", "notepad__current");
  section.setAttribute("id", `current-${index}`);
  section.setAttribute("hidden", "hidden");
  
  const form = document.createElement("form");
  form.setAttribute("class", "notepad__edit");
  form.setAttribute("id", `form-${index}`);
  form.setAttribute("onsubmit", `changeNotepadName(${index})`);

  const notepadTitle = document.createElement("label");

  notepadTitle.setAttribute("class", "notepad__label");
  notepadTitle.setAttribute("id", "user-notepad");
  notepadTitle.setAttribute("for", `notepad-${index}-title`);
  notepadTitle.innerText = "Notepad Title";

  const notepadNameContainer = document.createElement("div");

  notepadNameContainer.setAttribute("class", "notepad__head");

  const statsButton = document.createElement("button");
  statsButton.setAttribute("id", "view-stats");
  statsButton.setAttribute("type", "button");
  statsButton.innerText = "View Stats";

  const saveNotepad = document.createElement("button");
  saveNotepad.setAttribute("id", "update-notepad-title");
  saveNotepad.innerText = "Save";
  

  const deleteNotepad = document.createElement("button");
  deleteNotepad.innerText = "Delete";

  deleteNotepad.setAttribute("id", "delete-notepad");

  const notepadTitleInput = document.createElement("input");
  notepadTitleInput.value = notepads[index].notepadTitle;
  notepadTitleInput.setAttribute("id", `notepad-${index}-title`);
  

  notepadTitleInput.innerText = notepads[index].notepadTitle;

  notepadTitleInput.setAttribute("class", "notepad__input");

  container.appendChild(section);
  section.appendChild(form);
  form.appendChild(notepadNameContainer);
  notepadNameContainer.appendChild(notepadTitle);
  notepadNameContainer.appendChild(notepadTitleInput);
  form.appendChild(statsButton);
  form.appendChild(saveNotepad);
  form.appendChild(deleteNotepad);
  displayNotes(index);
  
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
      const titleDiv = document.createElement("h3");
      titleDiv.textContent = notepad.notepadTitle;
      notepadName.appendChild(titleDiv);
      notepadName.setAttribute("class", "notepad__entry");
      notepadName.setAttribute("id", `notepad-${index}`);
      titleDiv.onclick = () => {
        document.getElementById(`current-${index}`).toggleAttribute("hidden");
      };
      container.appendChild(notepadName);
      editNotepad(index);
    })
  }
  container.appendChild(button);
}

function notePlaceholder(title, text) {

}

function pushNote(currentNotepad, newNote){
  if (newNote.noteTitle !== "" && newNote.noteText !== ""){
    currentNotepad.notes.push(newNote);
    localStorage.setItem("notepads", JSON.stringify(notepads));
  }
}

function displayNotes(index) {
  
  const currentNotepad = notepads[index];
  const form = document.getElementById(`form-${index}`);
  const addNote = document.createElement("button");
  const header = document.createElement("h4");
  
  const newNameContainer = document.createElement("div");
  newNameContainer.setAttribute("class", "notepad__head");
  const newTextContainer = document.createElement("div");
  newTextContainer.setAttribute("class", "notepad__head");

  const noteText = document.createElement("label");
  noteText.setAttribute("class", "notepad__label");

  const newTitleInput = document.createElement("input");
  newTitleInput.setAttribute("class", "notepad__input");

  const newTextInput = document.createElement("input");
  newTextInput.setAttribute("class", "notepad__input");

  header.innerText = "My Notes";
  addNote.innerText = "Add";
  addNote.setAttribute("type", "button");
  
  addNote.onclick = () => {
    pushNote(currentNotepad, {noteTitle: newTitleInput.value, noteText: newTextInput.value});
    alert("Note added. Press save to save to notepad.");
  }
  form.appendChild(header);
  newTitleInput.setAttribute("placeholder", "Enter Note Title...");
  newTextInput.setAttribute("placeholder", "Enter Note...");

  form.appendChild(newNameContainer);
  newNameContainer.appendChild(newTitleInput);
  
  form.appendChild(newTextContainer);
  newTextContainer.appendChild(noteText);
  newTextContainer.appendChild(newTextInput);

  form.appendChild(addNote);
  
  currentNotepad.notes.forEach((note, index) => {

    const container = document.createElement("div");
    container.setAttribute("class", "notepad__editnote");
    container.setAttribute("id", `notepad-note-${index}`);
    form.appendChild(container);

    const noteNameContainer = document.createElement("div");
    noteNameContainer.setAttribute("class", "notepad__head");
    const noteTextContainer = document.createElement("div");
    noteTextContainer.setAttribute("class", "notepad__head");

    const noteTitleInput = document.createElement("input");
    noteTitleInput.setAttribute("class", "notepad__input");
    noteTitleInput.setAttribute("id", `note-${index}-title`);

    const noteTextInput = document.createElement("input");
    noteTextInput.setAttribute("class", "notepad__input");
    noteTextInput.setAttribute("id", `note-${index}-text`);

    noteTitleInput.value = note.noteTitle;
    noteTextInput.value = note.noteText;

    const updateNote = document.createElement("button");
    updateNote.setAttribute("id", `update-note-${index}`);
    updateNote.setAttribute("type", "button");
    updateNote.innerText = "Update";
 
    const deleteNote = document.createElement("button");
    deleteNote.innerText = "Delete";

    container.appendChild(noteNameContainer);
    noteNameContainer.appendChild(noteTitleInput);
    
    container.appendChild(noteTextContainer);
    noteTextContainer.appendChild(noteText);
    noteTextContainer.appendChild(noteTextInput);

    container.appendChild(updateNote);
    container.appendChild(deleteNote);

    updateNote.onclick = function(){
      note.noteTitle = noteTitleInput.value;
      note.noteText = noteTextInput.value;
      localStorage.setItem("notepads", JSON.stringify(notepads));
    }

  });
}

function deleteNotepad() {
  localStorage.clear();
}