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

function updateNotepad(){};

function editNotepad(index) {
  const container = document.getElementById(`notepad-${index}`);
  
  const section = document.createElement("section");
  section.setAttribute("class", "notepad__current");
  section.setAttribute("id", `current-${index}`);
  section.setAttribute("hidden", "hidden");
  
  const form = document.createElement("form");
  form.setAttribute("class", "notepad__form");
  form.setAttribute("id", `form-${index}`);
  form.setAttribute("onsubmit", "updateNotepad()")

  const notepadTitle = document.createElement("label");

  notepadTitle.setAttribute("class", "notepad__label");
  notepadTitle.setAttribute("id", "user-notepad");
  notepadTitle.setAttribute("for", "notepad-title");
  notepadTitle.innerText = "Notepad Title";

  const notepadNameContainer = document.createElement("div");

  notepadNameContainer.setAttribute("class", "notepad__head");

  const statsButton = document.createElement("button");
  statsButton.setAttribute("id", "view-stats");
  statsButton.innerText = "View Stats";

  const saveNotepad = document.createElement("button");
  saveNotepad.setAttribute("id", "save-notepad");
  saveNotepad.innerText = "Save";

  const deleteNotepad = document.createElement("button");
  deleteNotepad.innerText = "Delete";

  deleteNotepad.setAttribute("id", "delete-notepad");

  const notepadTitleInput = document.createElement("input");
  notepadTitleInput.setAttribute("placeholder", notepads[index].notepadTitle);

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
      // notepadName.innerHTML = notepad.notepadTitle;
      container.appendChild(notepadName);
      displayNotepad(index);
    })
  }
  container.appendChild(button);
}

function displayNotepad(index) {
  editNotepad(index);
}

function displayNotes(index) {
  const currentNotepad = notepads[index];
  const form = document.getElementById(`form-${index}`);
  const addNote= document.createElement("button");
  addNote.innerText = "Add";
  

  currentNotepad.notes.forEach(note => {
    
    console.log(form);

    const noteNameContainer = document.createElement("div");
    const noteTextContainer = document.createElement("div");
    noteNameContainer.setAttribute("class", "notepad__head");

    noteTextContainer.setAttribute("class", "notepad__head");

    const noteTitle = document.createElement("label");
    const noteText = document.createElement("label");
    noteText.setAttribute("class", "notepad__label");

    const noteTitleInput = document.createElement("input");
    const noteTextInput = document.createElement("input");

    noteTitleInput.setAttribute("class", "notepad__input");
    noteTextInput.setAttribute("class", "notepad__input");

    noteNameContainer.appendChild(noteTitle);
    noteNameContainer.appendChild(noteTitleInput);
    form.appendChild(noteNameContainer);
    form.appendChild(noteTextContainer);
    noteTextContainer.appendChild(noteText);
    noteTextContainer.appendChild(noteTextInput);

    noteTitle.setAttribute("class", "notepad__label");
    noteTitle.innerText = "My Notes";
  });

  form.appendChild(addNote);
}

function deleteNotepad() {
  localStorage.clear();
}