import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { EditBookForm } from './components/EditBookForm';

const url = 'http://localhost:3459';

function App() {
	const [books, setBooks] = useState([]);
	const [fieldTitle, setFieldTitle] = useState('');
	const [fieldDescription, setFieldDescription] = useState('');
	const [fieldNumberOfPages, setFieldNumberOfPages] = useState('');
	const [fieldLanguage, setFieldLanguage] = useState('');
	const [fieldImageUrl, setFieldImageUrl] = useState('');
	const [fieldBuyUrl, setFieldBuyUrl] = useState('');
	const [addPanelShowing, setAddPanelShowing] = useState(false);
	const [addBook, setAddBook] = useState({});

	useEffect(() => {
		(async () => {
			const _books = (await axios.get(`${url}/book`)).data.books;
			_books.forEach((book) => {
				book.editPanelShowing = false;
			});
			setBooks(_books);
		})();
	}, []);

	const handleButtonDelete = async (e, book) => {
		const deleteUrl = `${url}/book/${book._id}`;
		await axios.delete(deleteUrl);
		const _books = books.filter((m) => m._id !== book._id);
		setBooks(_books);
	};

	const handleButtonEdit = async (e, book) => {
		book.editPanelShowing = true;
		setFieldTitle(book.title);
		setFieldDescription(book.description);
		setFieldNumberOfPages(book.numberOfPages);
		setFieldLanguage(book.language);
		setFieldImageUrl(book.imageUrl);
		setFieldBuyUrl(book.buyUrl);
		setBooks([...books]);
	};

	const handleAddButtonClear = async (e, book) => {
		e.preventDefault();
		setAddPanelShowing(false);
		setFieldTitle('');
		setFieldDescription('');
		setFieldNumberOfPages('');
		setFieldLanguage('');
		setFieldImageUrl('');
		setFieldBuyUrl('');
	};

	const handleAddButtonSave = async (e, _book) => {
		e.preventDefault();
		setAddPanelShowing(false);

		addBook.title = fieldTitle;
		addBook.description = fieldDescription;
		addBook.numberOfPages = fieldNumberOfPages;
		addBook.language = fieldLanguage;
		addBook.imageUrl = fieldImageUrl;
		addBook.buyUrl = fieldBuyUrl;

		const addUrl = `${url}/book`;
		const ret = await axios.post(addUrl, {
			title: addBook.title,
			description: addBook.description,
			numberOfPages: addBook.numberOfPages,
			language: addBook.language,
			imageUrl: addBook.imageUrl,
			buyUrl: addBook.buyUrl,
		});

		const _books = [...books];
		_books.push(ret.data.book);

		setBooks(_books);
	};
	const handleButtonClear = async (e, book) => {
		e.preventDefault();
		book.editPanelShowing = false;
		setFieldTitle('');
		setFieldDescription('');
		setFieldNumberOfPages('');
		setFieldLanguage('');
		setFieldImageUrl('');
		setFieldBuyUrl('');
		setBooks([...books]);
	};

	const handleButtonSave = async (e, book) => {
		console.log(book);
		e.preventDefault();
		book.editPanelShowing = false;

		book.title = fieldTitle;
		book.description = fieldDescription;
		book.numberOfPages = fieldNumberOfPages;
		book.language = fieldLanguage;
		book.imageUrl = fieldImageUrl;
		book.buyUrl = fieldBuyUrl;

		const putUrl = `${url}/book/${book._id}`;
		await axios.put(putUrl, {
			title: book.title,
			description: book.description,
			numberOfPages: book.numberOfPages,
			language: book.language,
			imageUrl: book.imageUrl,
			buyUrl: book.buyUrl,
		});

		setBooks([...books]);
	};

	const handleAddBook = async (e, book) => {
		setAddBook({
			title: 'default value',
		});
		setAddPanelShowing(!addPanelShowing);
	};

	return (
		<div className="App">
			<h1>Book Site</h1>

			<p>There are {books.length} books.</p>

			<div className="addArea">
				<button className="addBook" onClick={(e) => handleAddBook(e)}>
					Add Book
				</button>
				<EditBookForm
					formIsShowing={addPanelShowing}
					fieldTitle={fieldTitle}
					setFieldTitle={setFieldTitle}
					fieldDescription={fieldDescription}
					setFieldDescription={setFieldDescription}
					fieldNumberOfPages={fieldNumberOfPages}
					setFieldNumberOfPages={setFieldNumberOfPages}
					fieldLanguage={fieldLanguage}
					setFieldLanguage={setFieldLanguage}
					fieldImageUrl={fieldImageUrl}
					setFieldImageUrl={setFieldImageUrl}
					fieldBuyUrl={fieldBuyUrl}
					setFieldBuyUrl={setFieldBuyUrl}
					handleButtonClear={handleAddButtonClear}
					handleButtonSave={handleAddButtonSave}
					addBook={addBook}
				/>
			</div>

			<div className="books">
				{books.map((book, i) => {
					return (
						<div key={i} className="book">
							<img src={book.imageUrl} />
							<div className="info">
								<div className="title">{book.title}</div>
								<div className="description">
									{book.description}
								</div>
								<div className="buttons">
									<button
										onClick={(e) =>
											handleButtonDelete(e, book)
										}
									>
										Delete
									</button>
									<button
										disabled={book.editPanelShowing}
										onClick={(e) =>
											handleButtonEdit(e, book)
										}
									>
										Edit
									</button>
								</div>
								<EditBookForm
									formIsShowing={book.editPanelShowing}
									fieldTitle={fieldTitle}
									setFieldTitle={setFieldTitle}
									fieldDescription={fieldDescription}
									setFieldDescription={setFieldDescription}
									fieldNumberOfPages={fieldNumberOfPages}
									setFieldNumberOfPages={
										setFieldNumberOfPages
									}
									fieldLanguage={fieldLanguage}
									setFieldLanguage={setFieldLanguage}
									fieldImageUrl={fieldImageUrl}
									setFieldImageUrl={setFieldImageUrl}
									fieldBuyUrl={fieldBuyUrl}
									setFieldBuyUrl={setFieldBuyUrl}
									handleButtonClear={handleButtonClear}
									handleButtonSave={handleButtonSave}
									book={book}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
