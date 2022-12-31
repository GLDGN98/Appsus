const { Outlet, NavLink, Link } = ReactRouterDOM
const { useParams, useNavigate, useSearchParams } = ReactRouterDOM


import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { storageService } from "../../../services/storage.service.js"
const { useEffect, useState , useRef} = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [showNewMessage, setShowNewMessage] = useState(false)
    const [isDrafted, setIsDrafted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const { type, id } = useParams()
    const currentUserMail = storageService.loadFromStorage('userDB').email
    const [params] = useSearchParams()
    const [newNoteMessage, setNewNoteMessage] = useState(null)

    const mainNavRef = useRef()


    useEffect(() => {
        const composeState = params.get('compose')
        if (composeState === 'on') {
            const title = params.get('title')
            const body = params.get('body')
            const mail = { title, body }
            console.log(mail)
            setNewNoteMessage(mail)
        }
    }, [])


    useEffect(() => {
        if (newNoteMessage) {
            eventBusService.emit('params-mail-loaded', newNoteMessage)
            setShowNewMessage(true)
        }
    }, [newNoteMessage])



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
            case 'drafts':
                draftedMails()
                break;
            default:
                loadMails()
                break;
        }

    }, [filterBy, type])


    function sentMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.from === currentUserMail && mail.removedAt === null && mail.isSent !== false)
        }).then(setMails)
    }

    function starredMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.starred === true && mail.removedAt === null)
        }).then(setMails)
    }

    function draftedMails() {
        mailService.query(filterBy).then(mails => {
            return mails.filter(mail => mail.from === currentUserMail && mail.isSent === false && mail.removedAt === null)
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
                return dateB.getTime() - dateA.getTime();
            });
            return setMails([...sortedMailsByDate])
        }
        if (value === 'name') {
            const sortedMailsByName = mails.sort((a, b) => {
                // Use the localeCompare method to compare the name property of each object
                return a.name.localeCompare(b.name);
            });
            return setMails([...sortedMailsByName])
        }
        if (value === 'read') {
            const sortedMailsByRead = mails.sort((a, b) => {
                if (a.isRead === b.isRead) {
                    return 0;
                }
                return a.isRead ? 1 : -1;
            });
            return setMails([...sortedMailsByRead])
        }
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
            showSuccessMsg('Mail moved successfully to the trash')
            return mails.filter(mail => mail.id !== removedMail.id)
        }).then(setMails)
            .catch((err) => {
                console.log('Something went wrong while trying to moving to trash!', err)
                showErrorMsg('Something went wrong')
            })
    }

    function handleRemove(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg('Deleted Successfully!')
        }).catch((err) => {
            console.log('error while trying to remove message', err);
            showErrorMsg('Something went wrong while trying to remove message!')
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

    function onCompose() {
        setShowNewMessage((show) => !show)
        setIsDrafted((drafted) => !drafted)
    }

    function toggleMenu() {
       document.body.classList.toggle('menu-open-mail')
    }

    return (
        <div className="mail-index">
            <div className="main-screen-mail" onClick={() => toggleMenu()}></div>
            <div className="mail-container">
                <div className="main-nav-app">
                    <button onClick={onCompose}><i className="fa-solid fa-plus"></i>Compose</button>
                    <div onClick={toggleMenu} className="menu-mobile">
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <nav onClick={() => toggleMenu()} ref={mainNavRef} className="main-nav flex-col">
                        <NavLink to="/mail/inbox"><i className="fa-solid fa-inbox"></i>Inbox</NavLink>
                        <NavLink to="/mail/starred"><i className="fa-regular fa-star"></i>Starred</NavLink>
                        <NavLink to="/mail/drafts"><i className="fa-regular fa-copy"></i>Drafts</NavLink>
                        <NavLink to="/mail/sent-email"><i className="fa-regular fa-paper-plane"></i>Sent</NavLink>
                        <NavLink to="/mail/trash"><i className="fa-regular fa-trash-can"></i>Trash</NavLink>
                    </nav>

                </div>
                {!isLoading &&
                    <div className="main-outlet">
                        <div className="nested-route">
                            {id ? <Outlet /> : null}
                            {id ? <Link className="go-back" to="/mail/inbox">Back</Link> : null}
                        </div>
                        {id ? null : <MailFilter showNav={showNav} setShowNav={setShowNav} sortBy={sortBy} onSetFilter={onSetFilter} />}
                        {id ? null : <MailCompose newNoteMessage={newNoteMessage} setIsDrafted={setIsDrafted} isDrafted={isDrafted} setShowNewMessage={setShowNewMessage} sendMail={sendMail} showNewMessage={showNewMessage} />}
                        {id ? null : <MailList handleDelete={handleDelete} mails={mails} />}
                    </div>
                }
                {isLoading && <div>LOADING!!!!</div>}
            </div>
        </div>
    )
}



