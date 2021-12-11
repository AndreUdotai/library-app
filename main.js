let bookTitle = document.getElementById('title');
let bookAuthor = document.getElementById('author');
let numberOfPages = document.getElementById('numOfPages');
let readingStatus = document.getElementById('status');
let dateAdded = document.getElementById('date');
let addNewBook = document.getElementById('add');
let removeBook = document.getElementById('deleteButton');
let formContainer = document.getElementById('formContainer');
let form = document.getElementById('form');
let allBooksCount = document.getElementById('allBooksCount');
let readCount = document.getElementById('readCount');
let notStartedCount = document.getElementById('notStartedCount');

// This function opens up the form when the 'Add book' button is clicked
let openForm = () => {
    formContainer.style.display = 'block';
}
// This function hides the form from the DOM
let closeForm = () => {
    formContainer.style.display = 'none';
}
// Declaring an empty array for the books
let myLibrary = [];

// Book constructor function
function Book(title, author, pages, read) {
    let today = new Date();

    // The id of the book is generated from the timestamp when it was entered ()
    this.id = new Date().getTime();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.date = `${new Date().getDate()}-${
        new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
    this.toggleRead = function () {
        return (this.read = this.read ? false : true);
    };
}
// This function adds book to the myLibrary array
let addBookToLibrary = () => {
    let newBook = new Book(
        bookTitle.value,
        bookAuthor.value,
        numberOfPages.value,
        readingStatus.value === 'Read' ? true : false,
    );

    // This logic checks if a new book with the same title and author already exists in the library
    let found = myLibrary.find(book => book.title === newBook.title && book.author === newBook.author);
    if (found) {
        alert('This book already exists in your library!');
    } else {
        myLibrary.push(newBook);
    }
}

function removeBookFromLibrary() {
    let removedBook = myLibrary.splice(
        myLibrary.findIndex(
            (book) => book.title === e.target.dataset.booktitle,
        ),
        1,
    );
    displayBooks();
}

// This function counts the number of books that have been read
let countRead = () => {
    let readCounter = 0;
    for(let book of myLibrary){
        if(book.read === true){
            readCounter += 1;
        }
    }
    return readCounter;
}
// This funtion counts the number of books that have not yet been read
let countNotRead = () => {
    let notReadCounter = 0;
    for(let book of myLibrary){
        if(book.read === false){
            notReadCounter += 1;
        }
    }
    return notReadCounter;
}

let displayBooks = () => {
    let row = document.getElementById('row');

    while (row.firstChild) {
        row.removeChild(row.firstChild);
    }

    for (book of myLibrary) {
        let bookCard = document.createElement('div');

        bookCard.innerHTML = `<div class="book read" style="width: 16rem" id="book">
            <h5 class="title">${book.title}</h5>
            <p>by <span class="author">${book.author}</span></p>
            <p><span class="pages">${book.pages}</span> pages</p>
            <p class="dateAdded">added on <span>${book.date}</span></p>
            <div class="bottom">
                <button class="btn btn-primary" data-ud=${book.id}>${
            book.read ? 'Read' : 'Not yet read'
        }</button>
                <button class="btn btn-primary" data-id=${
                    book.id
                }>Remove</button>
            </div>
        </div>`;

        row.appendChild(bookCard);
    }

    // These codes displays the number of all books, read books and not yet read books 
    // They are called whenever the displayBooks function is called
    allBooksCount.innerText = myLibrary.length;
    readCount.innerText = countRead();
    notStartedCount.innerText = countNotRead();
}

addNewBook.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBooks();
    closeForm();
    form.reset();
});

let row = document.getElementById('row');
row.addEventListener('click', function (e) {

    // Removes a book from the myLibrary array by comparing the book's id and the dataset attributes
    if (e.target.dataset.id) {
        let deletedBook = myLibrary.splice(
            myLibrary.findIndex((book) => book.id === e.target.dataset.id),
            1,
        );
        displayBooks();
    }

    // Toggles the read status
    if (e.target.dataset.ud) {
        for (let book of myLibrary) {
            if (book.id == e.target.dataset.ud) {
                book.toggleRead();
                displayBooks();
            }
        }
    }
});

