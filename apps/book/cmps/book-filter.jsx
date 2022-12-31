const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"

export function BookFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <section className="book-filter">
            <h2>Filter our books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Filter by name</label>
                <input name="txt" type="text" id="title" placeholder="By name" value={filterByToEdit.txt} onChange={handleChange} />
                <label htmlFor="minPrice">Filter by price</label>
                <input name="minPrice" type="number" placeholder="By Price" id="minPrice" value={filterByToEdit.minPrice} onChange={handleChange} />
                <button>Filter books</button>
            </form>
        </section>
    )
}