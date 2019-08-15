class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></td>
        `;
        //play with <a> tag above

        list.appendChild(row);
    }

    showAlert(message, className) {
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

    deleteBook(target, ui) {
        if (target.className === 'delete') {
            //show alert
            ui.showAlert('Book removed!', 'success');
            //console.log(target.parentElement.parentElement.children[2].innerHTML);
            target.parentElement.parentElement.remove();
            
            Store.removeBook(target.parentElement.parentElement.children[2].innerHTML);
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//local storage class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;

            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(target) {
        //console.log(target);
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        for (let x = 0; x < books.length; ++x) {
            if (books[x].isbn === target) {
                books.splice(x, 1);
                break;
            }
        }
        //console.log(books)
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

        //add to local storage
        Store.addBook(book);

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