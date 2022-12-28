const { Outlet, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouterDOM

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/mail-list.jsx"
const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    return (
        <div className="mail-index">
            <div className="mail-container">
                <div className="main-nav-app">
                    <button>+Compose</button>
                    <nav className="main-nav">
                        <NavLink to="/mail/inbox">Inbox</NavLink>
                        <NavLink to="/mail/starred">Starred</NavLink>
                        <NavLink to="/mail/drafts">Drafts</NavLink>
                        <NavLink to="/mail/sent-email">Sent Mail</NavLink>
                        <NavLink to="/mail/trash">Trash</NavLink>
                    </nav>
                </div>
                <div className="main-outlet">
                    <MailFilter onSetFilter={onSetFilter} />
                    <div className="nested-route">
                        <Outlet />
                    </div>
                    <MailCompose />
                </div>
            </div>
        </div>
    )
}

