// let books = [
// 	{
// 		title: "Sharlock holms",
// 		author: "Jane Doe",
// 	},
// 	{
// 		title: "Game of thrones",
// 		author: "Samuel Jackson",
// 	},
// ]

// function add(){
// 	let main = document.querySelector('.books-container');

// 	books.forEach((item) => {
// 		let bookTemplate = document.querySelector('.book-template');
// 		let book = bookTemplate.content.firstElementChild.cloneNode(true);
		
// 		let bookTitle = book.querySelector('.book-title');
// 		bookTitle.textContent = item.title;

// 		let bookAuthor = book.querySelector('.book-author');
// 		bookAuthor.textContent = item.author

// 		main.appendChild(book);
// 	});
// }

// add();

let storedBooks = [];
const list = document.querySelector('.books-container');
const form = document.querySelector('form');
const title = document.querySelector('#bookTitle');
const author = document.querySelector('#bookAuthor');

function removebook(bookinfo, index) {
	constbookData2 = document.getElementById(index);

	const {author: aut, title: tit} = bookinfo;
	storedBooks = storedBooks.filter((item) => item.author !== aut && item.title !== tit);
}

function addBook(bookinfo, index) {
	const bookData =document.createElement('div');
	bookData.classList.add('bookData');
	bookData.id = index;

	const removeButton = document.createElement('button');
	removeButton.classList.add('remove-btn');
	removeButton.innerText = 'Remove';

	const horizontalLine = document.createElement('hr');

	bookData.innerHTML = `<p class="bookTitle">${bookinfo.title}</p>
	<p class="bookAuthor">${bookinfo.author}</p>`;
	bookData.appendChild(removeButton);
	bookData.appendChild(horizontalLine)
	list.appendChild(bookData)

	removeButton.onclick = () => {
		removebook(bookinfo, index)
	}
}

function addBookItems(item) {
	storedBooks.push({
		title: title.value,
		author: author.value
	})
	localStorage.setItem('bookCollection', JSON.stringify(storedBooks));
	title.value = '';
	author.value = '';
	addBook(item, storedBooks.length - 1);
}
addBook();
addBookItems();