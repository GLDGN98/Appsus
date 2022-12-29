import { mailService } from "../services/mail.service.js"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, handleDelete, setIsStarredMail }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [isStarred, setIsStarred] = useState(mail.starred)
    // const [mouseOver, setMouseOver] = useState(false)

    function handleStar(ev, mailId) {
        ev.stopPropagation()
        setIsStarredMail(ev, mailId)
        setIsStarred((prev) => !prev)
        mail.starred = isStarred
        mailService.save(mail)
    }

    function onHandleDelete(ev, mailId) {
        ev.stopPropagation()
        handleDelete(mailId)
    }

    return (
        <Fragment>
            <tr style={mail.isRead ? { fontFamily: 'Lato Thin' } : { fontFamily: 'Lato' }} className="first-tr" onClick={() => {
                setIsExpanded(!isExpanded)
            }}>
                <td onClick={(ev) => handleStar(ev, mail.id)}>{mail.starred ? <i style={{ color: 'gold' }} className="fa-sharp fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}</td>
                <td>{mail.name}</td>
                <td>{mail.subject}</td>
                <td className="mail-sent-at">
                    <span className="sent-at">{mail.sentAt}</span>
                    <span className="trash-icon"><i onClick={(ev) => onHandleDelete(ev, mail.id)} className="fa-sharp fa-solid fa-trash"></i></span>
                </td>
            </tr>
            <tr className="second-tr" hidden={!isExpanded}>
                <td colSpan="3">
                    <span>{mail.from}</span>
                    <img src={`https://robohash.org/${mail.id}`} style={{ maxWidth: '50px' }} />
                    <p>{mail.body}</p>
                    <Link to={`/mail/inbox/${mail.id}`}><i className="fa-sharp fa-solid fa-expand"></i></Link>
                </td>
            </tr>
        </Fragment>
    )
}