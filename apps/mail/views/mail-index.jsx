const { Outlet, NavLink, Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouterDOM

import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { storageService } from "../../../services/storage.service.js"
const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [showNewMessage, setShowNewMessage] = useState(false)
    const { type, id } = useParams()
    const [updatedMails, setUpdatedMails] = useState([])
    const currentUserMail = storageService.loadFromStorage('userDB').email



    useEffect(() => {
        switch (type) {
            case 'starred':
                starredMails()
                break;
            case 'sent-email':
                sentMails()
                break;
            case 'trash':
                deletedMails()
                break;
            default: loadMails()
                break;
        }

    }, [filterBy, type])

    function sentMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.from === currentUserMail && mail.removedAt === null)
        }).then(setMails)
    }

    function starredMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.starred === true && mail.removedAt === null)
        }).then(setMails)
    }

    function sortBy(value) {
        if (value === 'title') {
            const sortedMailsBySubject = mails.sort((a, b) => {
                // Use the localeCompare method to compare the name property of each object
                return a.subject.localeCompare(b.subject);
            });
            return setMails([...sortedMailsBySubject])
        }
        if (value === 'date') {
            const sortedMailsByDate = mails.sort((a, b) => {
                // Convert the date strings to Date objects
                const dateA = new Date(a.sentAt);
                const dateB = new Date(b.sentAt);
                return dateA.getTime() - dateB.getTime();
            });
            return setMails([...sortedMailsByDate])
        }
    }

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

    function deletedMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.removedAt !== null)
        }).then(setMails)
    }

    function loadMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.from !== currentUserMail && mail.removedAt === null)
        }).then(setMails)
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function mailToTrash(mail) {
        mailService.get(mail.id).then((mail) => {
            const removedMail = { ...mail, removedAt: new Date().toLocaleDateString() }
            mailService.save(removedMail)
            return mails.filter(mail => mail.id !== removedMail.id)
        }).then(setMails)
    }

    function handleRemove(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg('Deleted Successfully!')
        })
    }

    function handleDelete(mailId) {
        mailService.get(mailId).then((mail) => {
            if (mail.removedAt === null) {
                return mailToTrash(mail)
            } else {
                return handleRemove(mail.id)
            }
        })
    }

    function handleReadMail(mailId) {
        mailService.get(mailId).then(mail => {
            if (mail.isRead === false) {
                return { ...mail, isRead: true }
            } else return { ...mail, isRead: false }
        }).then(updatedMail => {
            mailService.save(updatedMail)
            console.log(updatedMail)
        })
    }

    return (
        <div className="mail-index">
            <div className="mail-container">
                <div className="main-nav-app">
                    <button onClick={() => setShowNewMessage((show) => !show)}><i className="fa-solid fa-plus"></i>Compose</button>
                    <nav className="main-nav">
                        <NavLink to="/mail/inbox">Inbox</NavLink>
                        <NavLink to="/mail/starred">Starred</NavLink>
                        <NavLink to="/mail/drafts">Drafts</NavLink>
                        <NavLink to="/mail/sent-email">Sent Mail</NavLink>
                        <NavLink to="/mail/trash">Trash</NavLink>
                    </nav>
                </div>
                <div className="main-outlet">
                    <div className="nested-route">
                        {id ? <Outlet /> : null}
                        {id ? <Link to="/mail/inbox">Back</Link> : null}
                    </div>
                    {id ? null : <MailFilter sortBy={sortBy} onSetFilter={onSetFilter} />}
                    {id ? null : <MailCompose setShowNewMessage={setShowNewMessage} sendMail={sendMail} showNewMessage={showNewMessage} />}
                    {id ? null : <MailList handleDelete={handleDelete} handleReadMail={handleReadMail} mails={mails} setIsStarredMail={setIsStarredMail} />}
                </div>

            </div>
        </div>
    )
}



