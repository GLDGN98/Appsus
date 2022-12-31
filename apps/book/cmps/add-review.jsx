import { addReview } from "../services/review.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React

export function AddReview({ book, setBook }) {
    const [userReview, setUserReview] = useState({ username: '', rating: 0, readAt: '' })

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        value = type === 'date' ? new Date(value).toLocaleDateString() : value
        setUserReview((prev) => ({ ...prev, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        userReview.id = utilService.makeId()
        addReview(book.id, userReview).then(updatedBook => setBook(updatedBook))
    }


    


    return (
        <div>
            <form onSubmit={onSubmitReview}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    value={userReview.username}
                    onChange={handleChange}
                    name="username"
                />
                <label htmlFor="rating">Rating</label>
                <input
                    type="number"
                    min={0}
                    max={5}
                    placeholder="0-5"
                    id="rating"
                    value={userReview.rating}
                    onChange={handleChange}
                    name="rating"
                />
                <label htmlFor="date">Read At</label>
                <input
                    type="date"
                    placeholder="date"
                    id="date"
                    value={userReview.readAt}
                    onChange={handleChange}
                    name="readAt"
                />
                <button>Submit</button>
            </form>
        </div>
    )
}