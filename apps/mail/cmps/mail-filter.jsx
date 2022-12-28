import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState('')


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value } = target
        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, name: value, subject: value, body: value }))
        setFilterByToEdit(value)
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
        </div>
    )
}