const { useState, useEffect } = React

import { googleBookService } from "../services/google-book.service.js"

export function BookAdd({ onAddBook }) {

    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay]
        );
        return debouncedValue;
    }

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                googleBookService.query(debouncedSearchTerm).then((results) => {
                    setIsSearching(false);
                    setResults(results);
                });
            } else {
                setResults([]);
                setIsSearching(false);
            }
        },
        [debouncedSearchTerm]
    );

    function AddBook(ev, bookId) {
        ev.preventDefault()
        const newBook = results.filter(bookItem => bookId.id === bookItem.id)
        onAddBook(newBook[0])
    }

    return (
        <div>
            <form className="book-add-form">
                <label htmlFor="add-book">Add book from google</label>
                <input
                    type="text"
                    id="add-book"
                    value={searchTerm}
                    onChange={(ev) => setSearchTerm(ev.target.value)}
                    name="add-book"
                />
                <div>
                    <ul>
                        {results && results.map((res) =>
                            <li key={res.id}>
                                <div>{res.volumeInfo.title} <button onClick={(ev) => AddBook(ev, { id: res.id })}>+</button></div>
                            </li>
                        )}
                    </ul>
                </div>
            </form>
        </div>
    )
}