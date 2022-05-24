class Model {
  constructor(){
    if (!localStorage.getItem('books')){
      localStorage.setItem('books', JSON.stringify([]));
      this.booksData = JSON.parse(localStorage.getItem('books'));
    } else {
      this.booksData = JSON.parse(localStorage.getItem('books'));
    }
  }

  setBookItem(bookItem){
    let parsedBooksData = JSON.parse(localStorage.getItem('books'));
    parsedBooksData.push(bookItem);
    localStorage.setItem('books', JSON.stringify(parsedBooksData));
  } 
  getBooks(){
    return this.booksData;
  }
}


class View {
  constructor(){
    this.booksContainer = document.querySelector('.books-container');
    this.form = document.querySelector('form');
  }

  handleSubmit(model){
    this.form.addEventListener('submit', (e) => {
      const bookItem = Object.fromEntries(new FormData(e.target).entries());
      model.setBookItem(bookItem);
    });
  }

  renderBooks(books){
    books.forEach((item, index) => {
      let bookTemplate = document.querySelector('.book-template');
      let book = bookTemplate.content.firstElementChild.cloneNode(true);
      
      let bookTitle = book.querySelector('.book-title');
      bookTitle.textContent = item.title;

      let bookAuthor = book.querySelector('.book-author');  
      bookAuthor.textContent = item.author;

      let removeBookButton = book.querySelector('.remove-book');
      removeBookButton.addEventListener('click', (e) => {
        e.preventDefault();
        const books = JSON.parse(localStorage.getItem('books'));
        books.splice(index,1);
        
        localStorage.setItem('books', JSON.stringify(books));
        book.parentNode.removeChild(book);
      });

      this.booksContainer.appendChild(book);
    });
  }

}

class Controller{
  constructor(model, view){
    this.model = model
    this.view = view

    this.view.handleSubmit(this.model);
    this.listBooks();
  }

  listBooks(){
    this.view.renderBooks(this.model.getBooks());
  }

}

class App {
  constructor(){
    this.controller = new Controller(new Model(), new View());
  }
}

const app = new App();




