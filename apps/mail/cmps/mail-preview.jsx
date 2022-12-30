import { mailService } from "../services/mail.service.js"

import { LongTxt } from "./long-txt.jsx"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, handleDelete }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [isStarred, setIsStarred] = useState(mail.starred)
    const [isRead, setIsRead] = useState(mail.isRead)

    function handleStar(ev) {
        ev.stopPropagation()
        setIsStarred((prev) => mail.starred = !prev)
        mailService.save(mail)
    }

    function onRead(ev) {
        console.log(mail);
        ev.stopPropagation()
        setIsRead((prev) => mail.isRead = !prev)
        mailService.save(mail)
    }

    function onHandleDelete(ev, mailId) {
        ev.stopPropagation()
        handleDelete(mailId)
    }

    function getTimeSinceSent(date) {
        // Get the current time
        const currentTime = new Date();
        const secondsSinceSent = (currentTime - date) / 1000;
        if (secondsSinceSent < 86400) {
            return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
        }
        else if (secondsSinceSent < 604800) {
            return date.toLocaleDateString(undefined, { weekday: "long" });
        }
        else {
            return date.toLocaleDateString();
        }
    }






    return (
        <Fragment>
            <tr style={mail.isRead ? { fontFamily: 'Lato Thin', backgroundColor: '#f2f6fc' } : { fontFamily: 'Lato' }} className="first-tr" onClick={() => {
                setIsExpanded(!isExpanded)
            }}>
                <td onClick={handleStar}>{mail.starred ? <i style={{ color: 'gold' }} className="fa-sharp fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}</td>
                <td>{mail.name}</td>
                {/* <td>{mail.body}</td> */}
                <td><LongTxt txt={mail.body} length={120} /></td>
                <td className="mail-sent-at">
                    <span className="sent-at">{getTimeSinceSent(new Date(mail.sentAt))}</span>
                    <div className="hover-icons">
                        <Link to={`/mail/inbox/${mail.id}`}><span title="Expand" className="expand-icon"><i className="fa-solid fa-expand"></i></span></Link>
                        <span title="Delete" className="trash-icon"><i onClick={(ev) => onHandleDelete(ev, mail.id)} className="fa-solid fa-trash-can"></i></span>
                        <span onClick={onRead} className="unread-icon">{mail.isRead ? <i title="Unread" class="fa-solid fa-envelope-open"></i> : <i title="Read" class="fa-solid fa-envelope"></i>}</span>
                    </div>
                </td>
            </tr>
            <tr className="second-tr" hidden={!isExpanded}>
                <td style={{ borderBottom: '1px solid #d1dae0' }} colSpan="3">
                    <h2>{mail.name}</h2>
                    <h3>&lt;{mail.from}&gt;</h3>
                    <h3>{mail.subject}</h3>
                    <p>{mail.body}</p>
                    <Link to={`/mail/inbox/${mail.id}`}><i className="fa-sharp fa-solid fa-expand"></i></Link>
                </td>
            </tr>
        </Fragment >
    )
}