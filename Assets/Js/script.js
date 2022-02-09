updatePage();

function updatePage() {
  if (localStorage.getItem("notepad-title")){
    document.getElementById("user-notepad").innerHTML = localStorage.getItem("notepad-title");
  }
}

function store() {
  const inputEmail = document.getElementById("notepad-title");
  localStorage.setItem("notepad-title", inputEmail.value);
}
