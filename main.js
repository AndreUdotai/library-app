function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

let bookTitle   = document.getElementById('title');
let bookAuthor  = document.getElementById('author');
let numberOfPages   = document.getElementById('numOfPages');
let readingStatus   = document.getElementById('status');
let dateAdded   = document.getElementById('date')
let addNewBook  = document.getElementById('add');

let myLibrary = [];
let today = new Date();

function Book(title, author, pages, read) {
    this.title  = title
    this.author = author
    this.pages  = pages
    this.read   = read
    this.date   = `${today.getDate()}-${(today.getMonth()+1)}-${today.getFullYear()}`
    this.info   = function() {
      return `${title} by ${author}, ${pages} pages, ${read = read ? 'Read' : 'Not Read Yet'}`;
    }
}

function addBookToLibrary(){
    let newBook = new Book(bookTitle.value, bookAuthor.value, numberOfPages.value, readingStatus.value);
    myLibrary.push(newBook);
}

function displayBooks (){
    let row = document.getElementById('row');

    while (row.firstChild) {
        row.removeChild(row.firstChild);
    }
    for(book of myLibrary){
        let bookCard = document.createElement('div');

        bookCard.innerHTML = 
        `<div class="book read" style="width: 16rem" id="book">
            <h5 class="title">${book.title}</h5>
            <p>by <span class="author">${book.author}</span></p>
            <p><span class="pages">${book.pages}</span> pages</p>
            <p class="dateAdded">added on <span>${book.date}</span></p>
            <div class="bottom">
                <button class="btn btn-primary">${book.read}</button>
                <button class="btn btn-primary">Remove</button>
            </div>
        </div>`

        row.appendChild(bookCard);
    }
}

addNewBook.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBooks();
})
