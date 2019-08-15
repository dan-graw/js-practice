// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

// UI constructor
function UI() {}

// add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //NSERT COLS
    row.innerHTML = `
        <td>${book.title}</td>   
        <td>${book.author}</td>  
        <td>${book.isbn}</td>  
        <td><a href="#" class="delete">X<a></td>   
    `;

    list.appendChild(row);
}

//show alert
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //disappear after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

//delete book
UI.prototype.deleteBook = function(target, ui) {
    if (target.className === 'delete') {
        //show alert
        ui.showAlert('Book removed!', 'success');
        target.parentElement.parentElement.remove();
    }
}

// clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


//event listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
    
    //get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instantiate a book
    const book = new Book(title, author, isbn);

    //instantiate a UI object
    const ui = new UI();

    //validate
    if (title === '' || author === '' || isbn === '') {
        // error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        //add book to list
        ui.addBookToList(book);

        // clear fields
        ui.clearFields();

        //show alert
        ui.showAlert('Added book', 'success')
    }

    e.preventDefault();
});

//delete book
document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteBook(e.target, ui);

    e.preventDefault();
});
