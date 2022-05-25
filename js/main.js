/* eslint-disable max-classes-per-file */

class Model {
  constructor() {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify([]));
      this.booksData = JSON.parse(localStorage.getItem('books'));
    } else {
      this.booksData = JSON.parse(localStorage.getItem('books'));
    }
  }

  setBookItem(bookItem) {
    const parsedBooksData = JSON.parse(localStorage.getItem('books'));
    parsedBooksData.push(bookItem);
    localStorage.setItem('books', JSON.stringify(parsedBooksData));
    this.booksData = parsedBooksData;
  }

  getBooks() {
    return this.booksData;
  }
}

class View {
  constructor() {
    this.booksContainer = document.querySelector('.books-container');
    this.form = document.querySelector('form');
  }

  handleSubmit(model) {
    this.form.addEventListener('submit', (e) => {
      const bookItem = Object.fromEntries(new FormData(e.target).entries());
      model.setBookItem(bookItem);
    });
  }

  renderBooks(books) {
    books.forEach((item, index) => {
      const bookTemplate = document.querySelector('.book-template');
      const book = bookTemplate.content.firstElementChild.cloneNode(true);
      if (index % 2 === 1) {
        book.classList.add('grey');
      }
      const bookTitle = book.querySelector('.book-title');
      bookTitle.textContent = item.title;

      const bookAuthor = book.querySelector('.book-author');
      bookAuthor.textContent = item.author;

      const removeBookButton = book.querySelector('.remove-book');
      removeBookButton.addEventListener('click', (e) => {
        e.preventDefault();
        const books = JSON.parse(localStorage.getItem('books'));
        books.splice(index, 1);

        localStorage.setItem('books', JSON.stringify(books));
        book.parentNode.removeChild(book);
      });

      this.booksContainer.appendChild(book);
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.handleSubmit(this.model);
  }

  listBooks() {
    this.view.renderBooks(this.model.getBooks());
  }
}

window.onload = () => {
  const controller = new Controller(new Model(), new View());
  controller.listBooks();
};
