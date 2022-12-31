import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadMail()
    }, [])

    function MailRead() {
        return mailService.get(id).then(mail => {
            return { ...mail, isRead: true }
        }).then(mail => mailService.save(mail))
    }

    function loadMail() {
        mailService.get(id)
            .then((mail) => setMail(mail))
            .catch((err) => {
                console.log('had problem in mail details', err)
                navigator('/mail')
            })

        MailRead()

    }

    function sendToNote() {
        navigate(`/note/edit?type=txt&title=${mail.subject}&txt=${mail.body}`)
    }

    if (!mail) return <div>Loading...</div>
    console.log(mail)

    return (
        <div>
            <div className="mail-sender" style={{ textAlign: 'end' }}>
                <h2>&lt;{mail.from}&gt;</h2>
                <h3>{mail.name}</h3>
            </div>
            <div className="mail-details">
                <h1>{mail.subject}</h1>
                <p>{mail.body}</p>
                <button onClick={sendToNote}>To Note</button>
            </div>
        </div>
    )
}