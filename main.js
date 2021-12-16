let row = document.getElementById('row');

const formSwitch = (function () {
    let formContainer = document.getElementById('formContainer');
    // This function displays the form
    let openForm = () => {
        formContainer.style.display = 'block';
    };
    // This function hides the form from the DOM
    let closeForm = () => {
        formContainer.style.display = 'none';
    };
    return { openForm, closeForm };
})();

const libraryFunction = (function () {
    // Book Factory Function
    const Book = (title, author, pages, read) => {
        // The id of the book is generated from the timestamp when it was entered ()
        let id = new Date().getTime();
        let date = `${new Date().getDate()}-${
            new Date().getMonth() + 1
        }-${new Date().getFullYear()}`;
        let toggleRead = function () {
            return (read = read ? false : true);
        };

        return { title, author, pages, read, id, date, toggleRead };
    };
    // Declaring an empty array for the books
    let myLibrary = [];
    // This function adds book to the Library array
    let addBookToLibrary = () => {
        let bookTitle = document.getElementById('title');
        let bookAuthor = document.getElementById('author');
        let numberOfPages = document.getElementById('numOfPages');
        let readingStatus = document.getElementById('status');
        let newBook = Book(
            bookTitle.value,
            bookAuthor.value,
            numberOfPages.value,
            readingStatus.value === 'Read' ? true : false,
        );

        // This logic checks if a new book with the same title and author already exists in the library
        let found = myLibrary.find(
            (book) =>
                book.title === newBook.title && book.author === newBook.author,
        );
        if (found) {
            alert('This book already exists in your library!');
        } else {
            myLibrary.push(newBook);
        }
    };
    // This function counts the number of books that have been read
    let countRead = () => {
        let readCounter = 0;
        for (let book of myLibrary) {
            if (book.read === true) {
                readCounter += 1;
            }
        }
        return readCounter;
    };
    // This funtion counts the number of books that have not yet been read
    let countNotRead = () => {
        let notReadCounter = 0;
        for (let book of myLibrary) {
            if (book.read === false) {
                notReadCounter += 1;
            }
        }
        return notReadCounter;
    };
    let displayBooks = () => {
        let allBooksCount = document.getElementById('allBooksCount');
        let readCount = document.getElementById('readCount');
        let notStartedCount = document.getElementById('notStartedCount');
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
        allBooksCount.innerText = myLibrary.length;
        readCount.innerText = countRead();
        notStartedCount.innerText = countNotRead();
    };
    let removeBook = (target) => {
        let deletedBook = myLibrary.splice(
            myLibrary.findIndex((book) => book.id === target),
            1,
        );
        libraryFunction.displayBooks();
    };
    let toggleRead = (target) => {
        for (let book of myLibrary) {
            if (book.id == target) {
                book.read = book.toggleRead();
                displayBooks();
            }
        }
    };

    return {
        addBookToLibrary, displayBooks, removeBook, toggleRead,
    };
})();

document.getElementById('add').addEventListener('click', () => {
    libraryFunction.addBookToLibrary();
    libraryFunction.displayBooks();
    formSwitch.closeForm();
    document.getElementById('form').reset();
});

row.addEventListener('click', function (e) {
    // Removes a book from the Library array by comparing the book's id and the dataset attributes
    e.target.dataset.id ? libraryFunction.removeBook(e.target.dataset.id) : null;
    // Toggles the read status
    e.target.dataset.ud ? libraryFunction.toggleRead(e.target.dataset.ud) : null;
});

document.getElementById('formButton').addEventListener('click', formSwitch.openForm);
document.getElementById('closeFormButton').addEventListener('click', formSwitch.closeForm);
