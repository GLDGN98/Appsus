
const { useState } = React
import { deleteReview } from "../services/review.service.js"
import { bookService } from "../services/book.service.js"

export function BookReviews({ book, setBook }) {

    function onDeleteReview(reviewId) {
        const reviews = book.reviews.filter(review => reviewId !== review.id)
        const updateBook = { ...book, reviews }
        bookService.save(updateBook).then((book) => {
            setBook(book)
        })

    }

    return (
        <div className="book-reviews">
            <h2>Reviews</h2>
            {!book.reviews.length && <h1>No reviews to show</h1>}
            {book.reviews.length && book.reviews.map((review) => <div key={review.id} className="review">
                <h2>Username : {review.username}</h2>
                <h3>Rate : {'✨'.repeat(review.rating)}</h3>
                <h4>Read At: {review.readAt}</h4>
                <button onClick={() => onDeleteReview(review.id)}>DELETE</button>
            </div>)}
        </div>
    )
}