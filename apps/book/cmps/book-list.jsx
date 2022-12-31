import { BookPreview } from "./book-preview.jsx"
const { Link } = ReactRouterDOM



export function BookList({ books, onDeleteBook }) {

    return (
        <ul className="book-list">
            {books.map(book => <li key={book.id}>
                <BookPreview book={book} />
                <div>
                    {/* <button onClick={() => onSelectBook(book.id)}>SELECT</button> */}
                    <Link to={`/book/${book.id}`}>SELECT</Link>
                    <button onClick={() => onDeleteBook(book.id)}>DELETE</button>
                </div>
            </li>)}
        </ul>
    )
}