const { Outlet, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouterDOM

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
const { useEffect, useState } = React

export function MailIndex() {

    const [mails, setMails] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/mail/inbox')
        loadMails()
    }, [])

    function loadMails() {
        mailService.query().then(setMails)
    }

    function onOpenModal() {

    }


    return (
        <div className="mail-index">
            <div className="mail-container">
                <div className="main-nav-app">
                    <button onClick={onOpenModal}>+Compose</button>
                    <nav className="main-nav">
                        <NavLink to="/mail/inbox">Inbox</NavLink>
                        <NavLink to="/mail/starred">Starred</NavLink>
                        <NavLink to="/mail/drafts">Drafts</NavLink>
                        <NavLink to="/mail/sent-email">Sent Mail</NavLink>
                        <NavLink to="/mail/trash">Trash</NavLink>
                    </nav>
                </div>
                <div className="main-outlet">
                    <MailFilter />
                    <div className="nested-route">
                        <Outlet />
                    </div>
                    <MailCompose />
                </div>
            </div>
        </div>
    )
}

