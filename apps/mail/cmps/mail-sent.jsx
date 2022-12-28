const { Outlet, NavLink } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
const { useEffect, useState } = React

export function MailSent() {

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

