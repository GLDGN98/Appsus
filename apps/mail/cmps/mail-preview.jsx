import { mailService } from "../services/mail.service.js"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, mails, handleDelete }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [isStarred, setIsStarred] = useState(mail.starred)
    const [mouseOver, setMouseOver] = useState(false)

    function handleStar(ev) {
        ev.stopPropagation()
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
            <div style={mail.isRead ? { fontFamily: 'Lato Thin' } : { fontFamily: 'Lato' }}
                className="mail-preview">
                <tr onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} className="first-tr" onClick={() => {
                    setIsExpanded(!isExpanded)
                }}>
                    <td onClick={handleStar}>{mail.starred ? <i style={{ color: 'gold' }} className="fa-sharp fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}</td>
                    <td>{mail.name}</td>
                    <td>{mail.subject}</td>
                    <td className="mail-sent-at">
                        {mouseOver === true ? <i onClick={(ev) => onHandleDelete(ev, mail.id)} className="fa-sharp fa-solid fa-trash"></i> : mail.sentAt}
                    </td>
                </tr>
                <tr className="second-tr" hidden={!isExpanded}>
                    <td colSpan="3">
                        <td>{mail.from}</td>
                        <img src={`https://robohash.org/${mail.id}`} style={{ maxWidth: '50px' }} />
                        <p>{mail.body}</p>
                        <Link to={`/mail/${mail.id}`}><i className="fa-sharp fa-solid fa-expand"></i></Link>
                    </td>
                </tr>
            </div>
        </Fragment>
    )
}