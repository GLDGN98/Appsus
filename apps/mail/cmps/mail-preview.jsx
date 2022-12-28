const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Fragment>
            <tr onClick={() => {
                setIsExpanded(!isExpanded)
            }}>
                <td>{mail.from}</td>
                <td>{mail.subject}</td>
                <td>
                    {mail.sentAt}
                </td>
            </tr>
            <tr hidden={!isExpanded}>
                <td colSpan="3">
                    <img src={`https://robohash.org/${mail.id}`} style={{ maxWidth: '50px' }} />
                    <p>{mail.body}</p>
                    <Link to={`/mail/${mail.id}`}><i className="fa-sharp fa-solid fa-expand"></i></Link>
                </td>
            </tr>
        </Fragment>

    )
}