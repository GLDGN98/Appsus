import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailFilter({ onSetFilter, sortBy, setShowNav, showNav }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value } = target
        setFilterByToEdit((prev) => ({ ...prev, name: value }))
    }

    function changeFilterBy(ev) {
        if (ev.target.value === 'read' || 'unread') {
            return setFilterByToEdit((prev) => ({ ...prev, isRead: ev.target.value }))
        }
    }

    function onSortBy(ev) {
        sortBy(ev.target.value)
    }

    function expandHamburger() {
        setShowNav((prev) => !prev)
    }

    function toggleMenu() {
        if (window.visualViewport.width < 440) document.body.classList.toggle('menu-open-mail')

    }

    return (
        <div className="mail-filter">
            <div onClick={() => toggleMenu()} className="menu-mobile">
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className="search-wrapper">
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    onChange={handleChange}
                />
            </div>
            <div className="select">
                <select onChange={changeFilterBy} name="" id="">
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
                    <option value="name">By Name</option>
                    <option value="read">By Read</option>
                </select>
            </div>
        </div>
    )
}