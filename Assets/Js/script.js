
let notepads = [{
    notepadTitle: "",
    notes: []
}];


import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const octokit = new Octokit({ auth: "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" })
async function getData() {
  const result = await octokit.request('GET /gists')
  console.log(result);
}

updatePage();
listNotepads();

getData();
function updatePage() {
  if (localStorage.getItem("notepads")){
    notepads = JSON.parse(localStorage.getItem("notepads"));
  }
}

function storeNotepad() {
  const notepadTitle = document.getElementById("new-notepad-title").value;
  const newIndex = notepads.length === 1 ? notepads.length - 1 : notepads.length;
  console.log(notepads);
  console.log(notepads[newIndex]);
  let notes = storeNote();
  !notepads ? notepads[0] = {notepadTitle, notes} : notepads.push({notepadTitle, notes});
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

  const notepadTitle = document.createElement("h5");

  notepadTitle.setAttribute("class", "notepad__label");
  notepadTitle.innerText = "Notepad Title";

  const notepadNameContainer = document.createElement("div");
  notepadNameContainer.setAttribute("class", "notepad__head notepad-name");

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "notepad__container button-container");

  const statsButton = document.createElement("button");
  statsButton.setAttribute("id", "view-stats");
  statsButton.setAttribute("type", "button");
  statsButton.setAttribute("class", "notepad__button");
  statsButton.innerText = "View Stats";

  const saveNotepad = document.createElement("button");
  saveNotepad.setAttribute("id", "update-notepad-title");
  saveNotepad.setAttribute("class", "notepad__button save-button");
  saveNotepad.innerText = "Save";
  

  const deleteNotepad = document.createElement("button");
  deleteNotepad.innerText = "Delete";
  deleteNotepad.setAttribute("id", "delete-notepad");
  deleteNotepad.setAttribute("class", "notepad__button delete-button");
  deleteNotepad.onclick = () => {
    notepads.splice(index, 1);
    console.log(notepads);
    if (notepads === []) {() => notepads =  [{
        notepadTitle: "",
        notes: []
      }];
    }
    console.log(notepads);
    localStorage.setItem("notepads", JSON.stringify(notepads));
  }
  const notepadTitleInput = document.createElement("input");
  notepadTitleInput.value = notepads[index].notepadTitle;
  notepadTitleInput.setAttribute("id", `notepad-${index}-title`);
  notepadTitleInput.setAttribute("class", "notepad__input title-input");
  notepadTitleInput.innerText = notepads[index].notepadTitle;

  container.appendChild(section);
  section.appendChild(form);
  form.appendChild(notepadTitle);
  form.appendChild(notepadNameContainer);
  notepadNameContainer.appendChild(notepadTitleInput);
  notepadNameContainer.appendChild(buttonContainer);
  buttonContainer.appendChild(statsButton);
  buttonContainer.appendChild(saveNotepad);
  buttonContainer.appendChild(deleteNotepad);
  displayNotes(index);
  
}

function storeNote() {
  const noteTitle = document.getElementById("new-note-title").value;
  const noteText = document.getElementById("new-note-text").value;
  const newNote = [{noteTitle, noteText}];
  return newNote;
}

function listNotepads() {
  const wrapper = document.querySelector(".wrapper");
  const container = document.querySelector(".notepad__savednotepads");
  
  const button = document.createElement("button");
  button.setAttribute("class", "notepad__button notepad-creation");
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
  addNote.innerText = "Add";
  addNote.setAttribute("type", "button");
  addNote.setAttribute("class", "notepad__button add-button");

  const header = document.createElement("h4");
  
  const newContainer = document.createElement("div");
  newContainer.setAttribute("class", "notepad__head new-note");

  const newTitleInput = document.createElement("input");
  newTitleInput.setAttribute("class", "notepad__input");

  const newTextInput = document.createElement("textarea");
  newTextInput.setAttribute("class", "notepad__input text-input");

  header.innerText = "My Notes";
  
  addNote.onclick = () => {
    pushNote(currentNotepad, {noteTitle: newTitleInput.value, noteText: newTextInput.value});
    alert("Note added. Press save to save to notepad.");
  }
  form.appendChild(header);
  newTitleInput.setAttribute("placeholder", "Enter Note Title...");
  newTextInput.setAttribute("placeholder", "Enter Note...");

  form.appendChild(newContainer);
  newContainer.appendChild(newTitleInput);

  newContainer.appendChild(newTextInput);

  newContainer.appendChild(addNote);
  
  currentNotepad.notes.forEach((note, index) => {

    const container = document.createElement("div");
    container.setAttribute("class", "notepad__editnote");
    container.setAttribute("id", `notepad-note-${index}`);
    form.appendChild(container);

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "notepad__container button-container update-delete");

    const noteNameContainer = document.createElement("div");
    noteNameContainer.setAttribute("class", "notepad__head");
    const noteTextContainer = document.createElement("div");
    noteTextContainer.setAttribute("class", "notepad__head");

    const noteTitleInput = document.createElement("input");
    noteTitleInput.setAttribute("class", "notepad__input");
    noteTitleInput.setAttribute("id", `note-${index}-title`);

    const noteTextInput = document.createElement("textarea");
    noteTextInput.setAttribute("class", "notepad__input text-input");
    noteTextInput.setAttribute("id", `note-${index}-text`);

    noteTitleInput.value = note.noteTitle;
    noteTextInput.value = note.noteText;

    const updateNote = document.createElement("button");
    updateNote.setAttribute("id", `update-note-${index}`);
    updateNote.setAttribute("type", "button");
    updateNote.setAttribute("class", "notepad__button update-button");
    updateNote.innerText = "Update";
 
    const deleteNote = document.createElement("button");
    deleteNote.setAttribute("class", "notepad__button delete-button");
    deleteNote.innerText = "Delete";
    deleteNote.onclick = function(){
      currentNotepad.notes.splice(index, 1);
      localStorage.setItem("notepads", JSON.stringify(notepads));
    }

    container.appendChild(noteNameContainer);
    noteNameContainer.appendChild(noteTitleInput);
    
    container.appendChild(noteTextContainer);
    noteTextContainer.appendChild(noteTextInput);

    container.appendChild(buttonContainer);

    buttonContainer.appendChild(updateNote);
    buttonContainer.appendChild(deleteNote);

    updateNote.onclick = function(){
      note.noteTitle = noteTitleInput.value;
      note.noteText = noteTextInput.value;
      localStorage.setItem("notepads", JSON.stringify(notepads));
      updatePage();
    }

  });
}

function deleteNotepad() {
  // 
}