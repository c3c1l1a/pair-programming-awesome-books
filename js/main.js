function createTemplate(books) {
  const main = document.querySelector('.books-container');

  books.forEach((item, index) => {
    const bookTemplate = document.querySelector('.book-template');
    const book = bookTemplate.content.firstElementChild.cloneNode(true);

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

    main.appendChild(book);
  });
}

function checkFormObject() {
  if (!localStorage.getItem('books')) {
    // if not, create an empty object
    const books = [];
    // serialize the object to local storage
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    const books = JSON.parse(localStorage.getItem('books'));
    createTemplate(books);
  }
}

window.onload = () => {
  checkFormObject();
  const addBookForm = document.querySelector('#addBookForm');
  addBookForm.onsubmit = (e) => {
    const bookItem = Object.fromEntries(new FormData(e.target).entries());
    const books = JSON.parse(localStorage.getItem('books'));
    books.push(bookItem);

    // serialize form object to local storage
    localStorage.setItem('books', JSON.stringify(books));
  };
};
