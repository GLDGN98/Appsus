import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const noteRef = useRef()


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
        noteRef.current.classList.add('animate__heartBeat')
        setTimeout(() => {
            navigate(`/note/edit?type=txt&title=${mail.subject}&txt=${mail.body}`)
        }, 1000)
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
                <i title="To Note" ref={noteRef} onClick={sendToNote} style={{ cursor: 'pointer' }} class="fa-regular fa-note-sticky"></i>
            </div>
        </div>
    )
}