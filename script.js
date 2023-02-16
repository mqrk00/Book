const body = document.querySelector("body");
const form = document.querySelector("#form");
const booksContainer = document.querySelector("#booksContainer");
const formContainer = document.querySelector("#formContainer");
const readStatus = document.querySelector("#readStatus");
const backgroundCover = document.querySelector("#backgroundCover");

let myLibrary = [];
let divs = [];

function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

form.onsubmit = (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const readStatus = document.querySelector("#readStatus").value;
  formContainer.classList.toggle("show-form");
  addBookToLibrary(name, author, pages, readStatus);
  backgroundCover.classList.remove("showBackgroundCover");
 form.reset();
};
function showForm() {
  formContainer.classList.add("show-form");
  
  readStatus.classList.remove("notRead");
  readStatus.classList.add("read");
  readStatus.value = "Read";
  backgroundCover.classList.add("showBackgroundCover");
 
}

backgroundCover.addEventListener("click", ()=> backgrCoverRemove());


function addBookToLibrary(name, author, pages, readStatus) {
  const newBook = new Book(name, author, pages, readStatus);
  myLibrary.push(newBook);
  makeBookDivs();
}

function makeBookDivs() {
  const div = document.createElement("div");
  div.classList.add("bookDiv");

  let nameDisplay = document.createElement("p");
  let authorDisplay = document.createElement("p");
  let pagesDisplay = document.createElement("p");
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Book";
  let readStatusDisplay = document.createElement("input");
  readStatusDisplay.setAttribute("type", "button");
  readStatusDisplay.setAttribute("value", readStatus.value);
  readStatusDisplay.classList.add(readStatus.getAttribute("class"));

  deleteButton.classList.add("deletebtn");

  divs.push(div);

  div.appendChild(nameDisplay);
  div.appendChild(authorDisplay);
  div.appendChild(pagesDisplay);
  div.appendChild(readStatusDisplay);
  div.appendChild(deleteButton);

  div.dataset.num = `${divs.length - 1}`;

  booksContainer.appendChild(div);

  displayBooks(nameDisplay, authorDisplay, pagesDisplay);
}

function displayBooks(nameDisplay, authorDisplay, pagesDisplay) {
  nameDisplay.textContent = myLibrary[myLibrary.length - 1].name;
  authorDisplay.textContent = myLibrary[myLibrary.length - 1].author;
  pagesDisplay.textContent = myLibrary[myLibrary.length - 1].pages;
}

booksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("deletebtn")) {
    const x = myLibrary.splice(e.target.parentElement.dataset.num, 1);
    e.target.parentElement.remove();
    divs.splice(e.target.parentElement.dataset.num, 1);
    for (let i = 0; i < divs.length; i++) {
      divs[i].dataset.num = `${i}`;
      console.log(divs[i].dataset.num);
    }
  } else if (
    e.target.classList.contains("read") ||
    e.target.classList.contains("notRead")
  ) {
    onOffinDiv(e);
  }
});
function onOffinDiv(e) {
  if(e.target.classList.contains("read")) {
    e.target.classList.remove("read");
    e.target.classList.add("notRead");
    e.target.value = "Not Read";
    myLibrary[e.target.parentElement.dataset.num].readStatus = e.target.value;
  }
  else if(e.target.classList.contains("notRead")) {
    e.target.classList.remove("notRead");
    e.target.classList.add("read");
    e.target.value = "Read";
    myLibrary[e.target.parentElement.dataset.num].readStatus = e.target.value;


  }
}
function onOffinForm() {
  const readStatusBtn = document.querySelector("#readStatus");
  if (readStatusBtn.classList.contains("read")) {
    readStatusBtn.classList.remove("read");
    readStatusBtn.classList.add("notRead");
    readStatusBtn.value = "Not Read";
  } else {
    readStatusBtn.classList.remove("notRead");
    readStatusBtn.classList.add("read");
    readStatusBtn.value = "Read";
  }
}

function backgrCoverRemove()
{
  formContainer.classList.remove("show-form");
  backgroundCover.classList.remove("showBackgroundCover");
}

