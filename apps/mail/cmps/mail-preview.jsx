const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Fragment>
            <div className="mail-preview">
                <tr className="first-tr" onClick={() => {
                    setIsExpanded(!isExpanded)
                }}>
                    <td><i className="fa-regular fa-star"></i></td>
                    <td>{mail.from}</td>
                    <td>{mail.subject}</td>
                    <td className="mail-sent-at">
                        {mail.sentAt}
                    </td>
                </tr>
                <tr className="second-tr" hidden={!isExpanded}>
                    <td colSpan="3">
                        <img src={`https://robohash.org/${mail.id}`} style={{ maxWidth: '50px' }} />
                        <p>{mail.body}</p>
                        <Link to={`/mail/${mail.id}`}><i className="fa-sharp fa-solid fa-expand"></i></Link>
                    </td>
                </tr>
            </div>
        </Fragment>

    )
}