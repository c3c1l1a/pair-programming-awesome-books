let books = [
	{
		title: "Sharlock holms",
		author: "Jane Doe",
	},
	{
		title: "Game of thrones",
		author: "Samuel Jackson",
	},
]

function add(){
	let main = document.querySelector('.books-container');

	books.forEach((item) => {
		let bookTemplate = document.querySelector('.book-template');
		let book = bookTemplate.content.firstElementChild.cloneNode(true);
		
		let bookTitle = book.querySelector('.book-title');
		bookTitle.textContent = item.title;

		let bookAuthor = book.querySelector('.book-author');
		bookAuthor.textContent = item.author

		main.appendChild(book);
	});
}

add();