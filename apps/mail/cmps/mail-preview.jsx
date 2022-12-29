import { mailService } from "../services/mail.service.js"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, handleDelete, setIsStarredMail, handleReadMail }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [isStarred, setIsStarred] = useState(mail.starred)
    const [isRead, setIsRead] = useState(mail.isRead)
    // const [mouseOver, setMouseOver] = useState(false)

    function handleStar(ev, mailId) {
        ev.stopPropagation()
        setIsStarredMail(ev, mailId)
        setIsStarred((prev) => !prev)
        mail.starred = isStarred
        mailService.save(mail)
    }

    function onRead(ev) {
        console.log(mail);
        
        ev.stopPropagation()
        // handleReadMail(mailId)
        setIsRead((prev) => !prev)
        mail.isRead = isRead
        mailService.save(mail)
        // return mailService.get(mailId).then(mail => {
        //     return { ...mail, isRead: true }
        // }).then(mail => mailService.save(mail))

    }

    function onHandleDelete(ev, mailId) {
        ev.stopPropagation()
        handleDelete(mailId)
    }

    return (
        <Fragment>
            <tr style={mail.isRead ? { fontFamily: 'Lato Thin', backgroundColor: '#f7f8fa' } : { fontFamily: 'Lato' }} className="first-tr" onClick={() => {
                setIsExpanded(!isExpanded)
            }}>
                <td onClick={(ev) => handleStar(ev, mail.id)}>{mail.starred ? <i style={{ color: 'gold' }} className="fa-sharp fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}</td>
                <td>{mail.name}</td>
                <td>{mail.body}</td>
                <td className="mail-sent-at">
                    <span className="sent-at">{new Date(mail.sentAt).toLocaleDateString()}</span>
                    <div className="hover-icons">
                        <Link to={`/mail/inbox/${mail.id}`}><span title="Expand" className="expand-icon"><i className="fa-solid fa-expand"></i></span></Link>
                        <span title="Delete" className="trash-icon"><i onClick={(ev) => onHandleDelete(ev, mail.id)} className="fa-sharp fa-solid fa-trash"></i></span>
                        <span onClick={onRead} title="Read" className="unread-icon"><i className="fa-regular fa-envelope"></i></span>
                    </div>
                </td>
            </tr>
            <tr className="second-tr" hidden={!isExpanded}>
                <td colSpan="3">
                    <h2>{mail.name}</h2>
                    <h3>&lt;{mail.from}&gt;</h3>
                    <h3>{mail.subject}</h3>
                    <p>{mail.body}</p>
                    <Link to={`/mail/inbox/${mail.id}`}><i className="fa-sharp fa-solid fa-expand"></i></Link>
                </td>
            </tr>
        </Fragment>
    )
}