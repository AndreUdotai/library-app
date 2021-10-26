function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
      return `${title} by ${author}, ${pages} pages, ${read = read ? 'read' : 'not read yet'}`;
    }
}

function addBookToLibrary(){
    
}

  