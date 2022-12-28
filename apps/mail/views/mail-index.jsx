const { Outlet, Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
const { useEffect } = React

export function MailIndex() {

    useEffect(() => {
        loadMails()
    }, [])


    function loadMails() {
        mailService.query().then(res => console.log(res))
    }

    return (
        <div>
            <MailFilter />
            <MailCompose />

            <nav>
                <Link to="/mail">Inbox</Link>
                <Link to="/mail/starred">Starred</Link>
                <Link to="/mail/drafts">Drafts</Link>
                <Link to="/mail/sent-email">Sent Mail</Link>
                <Link to="/mail/trash">Trash</Link>
            </nav>

            <div className="nested-route">
                <Outlet />
            </div>
            <MailList />
        </div>
    )
}

