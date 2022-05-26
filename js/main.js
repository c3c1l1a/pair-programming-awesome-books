/* eslint-disable class-methods-use-this */
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
    this.addNewPage = document.querySelector('.nav-add-new');
    this.listBooksPage = document.querySelector('.nav-list-books');
    this.contactPage = document.querySelector('.nav-contact');

    this.listBooksPage.classList.add('blue');
  }

  removeOldTemplates() {
    this.listBooksPage.classList.remove('blue');
    this.contactPage.classList.remove('blue');
    this.addNewPage.classList.remove('blue');

    const oldBooksContainer = document.querySelector('.list-books-page-container');
    const oldFormPage = document.querySelector('.form-page-container');
    const oldContactContainer = document.querySelector('.contact-page-container');

    if (oldBooksContainer !== null) {
      oldBooksContainer.parentNode.removeChild(oldBooksContainer);
    }

    if (oldFormPage !== null) {
      oldFormPage.parentNode.removeChild(oldFormPage);
    }

    if (oldContactContainer !== null) {
      oldContactContainer.parentNode.removeChild(oldContactContainer);
    }
  }

  handleNav(model) {
    this.addNewPage.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeOldTemplates();

      e.target.classList.add('blue');

      const mainTag = document.querySelector('main');
      const formPage = document.querySelector('.form-page');
      const formTemplate = formPage.content.firstElementChild.cloneNode(true);

      mainTag.appendChild(formTemplate);
      this.handleSubmit(model);
    });

    this.listBooksPage.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeOldTemplates();

      e.target.classList.add('blue');
      this.renderBooks(model.getBooks());
    });

    this.contactPage.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeOldTemplates();

      e.target.classList.add('blue');

      const mainTag = document.querySelector('main');
      const contactPage = document.querySelector('.contact-page');
      const contactPageTemplate = contactPage.content.firstElementChild.cloneNode(true);
      mainTag.appendChild(contactPageTemplate);
    });
  }

  handleSubmit(model) {
    const form = document.querySelector('form');
    if (form !== null) {
      form.addEventListener('submit', (e) => {
        const bookItem = Object.fromEntries(new FormData(e.target).entries());
        model.setBookItem(bookItem);
      });
    }
  }

  renderBooks(books) {
    const mainTag = document.querySelector('main');
    const listPage = document.querySelector('.list-books-page');
    const listPageTemplate = listPage.content.firstElementChild.cloneNode(true);
    const booksContainer = listPageTemplate.querySelector('.books-container');

    books.forEach((item, index) => {
      const bookTemplate = document.querySelector('.book-template');
      const book = bookTemplate.content.firstElementChild.cloneNode(true);
      if (index % 2 === 0) {
        book.classList.add('grey');
      }
      const bookTitle = book.querySelector('.book-title');
      bookTitle.textContent = item.title;

      const bookAuthor = book.querySelector('.book-author');
      bookAuthor.textContent = item.author;

      const removeBookButton = book.querySelector('.remove-book');
      removeBookButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();

        const books = JSON.parse(localStorage.getItem('books'));
        books.splice(index, 1);

        localStorage.setItem('books', JSON.stringify(books));
        book.parentNode.removeChild(book);
      });

      if (booksContainer !== null) {
        booksContainer.appendChild(book);
        listPageTemplate.appendChild(booksContainer);
      }
    });
    mainTag.appendChild(listPageTemplate);
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.handleSubmit(this.model);
    this.view.handleNav(this.model);
  }

  listBooks() {
    this.view.renderBooks(this.model.getBooks());
  }
}

window.onload = () => {
  const controller = new Controller(new Model(), new View());
  controller.listBooks();
};
