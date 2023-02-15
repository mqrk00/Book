const body = document.querySelector("body");
const form = document.querySelector("#form");
const booksContainer = document.querySelector("#booksContainer");
const formContainer = document.querySelector("#formContainer");

let myLibrary = [];
let divs = [];

function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
}

form.onsubmit = (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  formContainer.classList.toggle("show-form");
  body.style.pointerEvents = "all";
  addBookToLibrary(name, author, pages);
};

function addBookToLibrary(name, author, pages) {
  const newBook = new Book(name, author, pages);
  myLibrary.push(newBook);
  makeBookDivs();
}

function makeBookDivs() {
  const div = document.createElement("div");
  div.classList.add("bookDiv");

  let nameTxt = document.createElement("p");
  let authorTxt = document.createElement("p");
  let pagesTxt = document.createElement("p");
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("deletebtn");

  divs.push(div);

  div.appendChild(nameTxt);
  div.appendChild(authorTxt);
  div.appendChild(pagesTxt);
  div.appendChild(deleteButton);

  div.dataset.num = `${divs.length - 1}`;

  booksContainer.appendChild(div);

  displayBooks(nameTxt, authorTxt, pagesTxt);
}

function displayBooks(nameTxt, authorTxt, pagesTxt) {
  nameTxt.textContent = `name: ${myLibrary[myLibrary.length - 1].name}`;
  authorTxt.textContent = `author:  ${myLibrary[myLibrary.length - 1].author}`;
  pagesTxt.textContent = `pages:  ${myLibrary[myLibrary.length - 1].pages}`;
}

function showForm() {
  formContainer.classList.add("show-form");
  body.style.pointerEvents = "none";
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
  }
});
