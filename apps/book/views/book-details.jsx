
const { useEffect, useState } = React
const { useParams, Link, useNavigate } = ReactRouterDOM

import { AddReview } from "../cmps/add-review.jsx"
import { addReview } from "../services/review.service.js"
import { bookService } from "../services/book.service.js"
import { BookReviews } from "../cmps/book-reviews.jsx"

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId).then((book) => setBook(book))
        bookService.getNextBookId(params.bookId).then(setNextBookId)
        bookService.getPrevBookId(params.bookId).then(setPrevBookId)


    }

    const showPageCount = () => {
        if (book.pageCount > 500) return <h4>Serious Reading</h4>
        if (book.pageCount > 200) return <h4>Descent Reading</h4>
        if (book.pageCount < 100) return <h4>Light Reading</h4>
    }

    function showLabel() {
        const now = new Date()
        const newCutoff = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        const vintageCutoff = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());

        if (book.publishedDate > newCutoff.getFullYear()) return <h4>New</h4>;
        if (book.publishedDate < vintageCutoff.getFullYear()) return <h4>Vintage</h4>;
    }

    function showPrice() {
        if (book.listPrice.amount > 150) return <h3 style={{ color: 'red' }}>{book.listPrice.amount} {book.listPrice.currencyCode}</h3>
        if (book.listPrice.amount < 20) return <h3 style={{ color: 'green' }}>{book.listPrice.amount} {book.listPrice.currencyCode}</h3>
        else return <h3>{book.listPrice.amount} {book.listPrice.currencyCode}</h3>

    }

    function onGoBack() {
        navigate('/book')
    }

    function showSale() {
        if (book.listPrice.isOnSale) return <h2>ON SALE!</h2>
    }

    if (!book) return <div>Loading...</div>
    return (
        <div>
            <section className="book-details">
                <Link to={`/book/${nextBookId}`}>Next Book</Link>
                <Link to={`/book/${prevBookId}`}>Prev Book</Link>
                <h1>{book.title}</h1>
                <img style={{ width: '400px' }} src={book.thumbnail} alt="" />
                {showPageCount()}
                {showLabel()}
                {showPrice()}
                {showSale()}
                <hr />
                {book.description}
                <button onClick={onGoBack}>GO BACK</button>
                <Link to={`/book/edit/${book.id}`}>EDIT ME</Link>
            </section>
            <hr />
            <section>
                <AddReview book={book} setBook={setBook} />
                <BookReviews book={book} setBook={setBook} />



            </section>
        </div>

    )
}