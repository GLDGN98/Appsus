import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailFilter({ onSetFilter, sortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value } = target
        setFilterByToEdit((prev) => ({ ...prev, name: value }))
    }

    function changeFilterByRead(ev) {
        setFilterByToEdit((prev) => ({ ...prev, isRead: ev.target.value }))
    }

    function onSortBy(ev) {
        sortBy(ev.target.value)
    }


    return (
        <div className="mail-filter">
            <div className="search-wrapper">
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    onChange={handleChange}
                />
            </div>
            <div className="select">
                <select onChange={changeFilterByRead} name="" id="">
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>
            <div className="select">
                <select onChange={onSortBy} name="sort-by" id="sort-by">
                    <option value="">Select Sorting</option>
                    <option value="title">By Title</option>
                    <option value="date">By Date</option>
                </select>
            </div>
        </div>
    )
}