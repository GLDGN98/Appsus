const { Outlet, NavLink } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
const { useEffect, useState } = React

export function MailInbox() {

    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query().then(setMails)
    }

    return (
        <div className="mail-inbox">
            <MailList mails={mails} />
        </div>
    )
}

