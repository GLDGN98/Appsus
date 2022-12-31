import { booksData } from '../data/books.js';
import { storageService } from './async-stoage.service.js';
import { utilService } from './util.service.js';



const BOOK_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook,
    getNextBookId,
    getPrevBookId,
    addGoogleBook
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })

}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
    // return axios.get(BOOK_KEY, carId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}

function getEmptyBook(title = "", amount = "") {
    return {
        title,
        subtitle: "Tralalala",
        authors: ['Blabla'],
        publishedDate: 0,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, ipsum. Architecto, quas voluptates molestias explicabo odit consequatur tempora quia veniam asperiores. Ullam, quas! Magni atque corporis asperiores voluptatibus sapiente tempore",
        pageCount: 369,
        categories: ['Drama', 'Action'],
        thumbnail: "http://coding-academy.org/books-photos/20.jpg",
        language: "en",
        listPrice: {
            amount,
            currencyCode: "EUR",
            isOnSale: false
        }
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [...booksData]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function addGoogleBook(item) {
    console.log(item)
    const newBook = {
        reviews: [],
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        subtitle: item.volumeInfo.subtitle,
        publishedDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
        thumbnail: item.volumeInfo.image.thumbnail,
        listPrice: { amount: 110 + '$' }
    }
    return storageService.post(BOOK_KEY, newBook)

}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx - 1].id
        })
}

