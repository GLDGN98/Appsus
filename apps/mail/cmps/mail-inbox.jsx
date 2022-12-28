
import { MailList } from "../cmps/mail-list.jsx"
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

    function handleDelete(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
        })
    }

    return (
        <div className="mail-inbox">
            <MailList handleDelete={handleDelete} mails={mails} />
        </div>
    )
}

