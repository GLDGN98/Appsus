import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM


export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBookToEdit(book))
            .catch((err) => {
                console.log('Error in car details', err)
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        // value = (type === 'number') ? +value : value
        if (type === 'number') {
            bookToEdit.listPrice.amount = value
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit).then((book) => {
            console.log('car saved', book);
            showSuccessMsg('Added Book Successfully!')
            navigate('/book')
        })
    }

    return (
        <section className="book-edit">
            <h1>Edit Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title :</label>
                <input
                    type="text"
                    name="title"
                    value={bookToEdit.title}
                    id="title"
                    onChange={handleChange}
                    placeholder="Enter book title" />
                <label htmlFor="amount">Price :</label>
                <input
                    type="number"
                    name="amount"
                    value={bookToEdit.price}
                    id="amount"
                    onChange={handleChange}
                    placeholder="Enter book Price" />
                <button>Save</button>
                <Link to="/book">Cancel</Link>
            </form>
        </section>)
}