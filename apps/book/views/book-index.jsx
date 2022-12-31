import { BookFilter } from '../cmps/book-filter.jsx';
import { BookList } from '../cmps/book-list.jsx';
import { bookService } from '../services/book.service.js';
import { showSuccessMsg } from '../services/event-bus.service.js';
import { BookAdd } from '../cmps/book-add.jsx';

const { useState, useEffect } = React

const { Link } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(books => {
            setBooks(books)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
        console.log(filterBy);
    }

    function onDeleteBook(bookId) {
        bookService.remove(bookId).then(() => {
            const newBooks = books.filter(book => book.id !== bookId)
            setBooks(newBooks)
            showSuccessMsg('Deleted Book Successfully!')
        }
        )
    }

    function onAddBook(item) {
        bookService.addGoogleBook(item).then(loadBooks)
    }

    return (
        <div className="book-index">
            <BookAdd setBooks={setBooks} onAddBook={onAddBook} />
            <div>
                <BookFilter onSetFilter={onSetFilter} />
                <Link className="add-book-index" to="/book/edit">ADD YOUR BOOK</Link>
                <BookList onDeleteBook={onDeleteBook} books={books}
                />
            </div>
        </div>
    )
}