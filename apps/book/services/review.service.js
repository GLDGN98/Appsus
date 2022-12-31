import { storageService } from "./async-stoage.service.js";
import { bookService } from "./book.service.js";

export function addReview(bookId, review) {
    return storageService.get('booksDB', bookId).then(book => {
        book.reviews.push(review)
        return bookService.save(book)
    })
}


