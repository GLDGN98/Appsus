const { Outlet, NavLink } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouterDOM

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [showNewMessage, setShowNewMessage] = useState(false)
    const { type } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        switch (type) {
            case 'starred':
                starredMails()
                break;
            default: loadMails()
                break;
        }


    }, [filterBy, type])


    function setIsStarredMail(ev, mailId) {
        console.log(ev, mailId)
        //     ev.stopPropagation()
        //     setIsStarred(prev => !prev)
        //     mailService.get(mailId).then(mail => setMail({ ...mail, starred: isStarred })).then(mail => {
        //         return mailService.save(mail)
        //     })
        //     console.log('TODO: I will change isStarred key on specific mail (VIA SERVICE), this will cause a re-render of the mail preview as !prevStatus.isStarred')
    }

    function sendMail(newMessage) {
        mailService.save(newMessage).then(() => {
            const updatedMails = [...mails, newMessage]
            setMails(updatedMails)
            // navigate('/mail/sent-email')
        })
        // setMails((prevMails) => [...prevMails, newMessage])
    }

    function starredMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.starred === true)
        }).then(setMails)
    }

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function handleDelete(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg('Deleted Successfully!')
        })
    }


    return (
        <div className="mail-index">
            <div className="mail-container">
                <div className="main-nav-app">
                    <button onClick={() => setShowNewMessage((show) => !show)}>+Compose</button>
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
                    <MailCompose sendMail={sendMail} showNewMessage={showNewMessage} />
                    <MailList handleDelete={handleDelete} mails={mails} setIsStarredMail={setIsStarredMail} />
                </div>
            </div>
        </div>
    )
}

