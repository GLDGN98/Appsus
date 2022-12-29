import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailFilter({ onSetFilter }) {
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



    return (
        <div>
            <input
                type="text"
                id="search"
                name="search"
                placeholder="Search..."
                onChange={handleChange}
            />
            <select onChange={changeFilterByRead} name="" id="">
                <option value="">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </div>
    )
}