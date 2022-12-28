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


    if (!mail) return <div>Loading...</div>
    return (
        <div className="mail-details">
            <h1>{mail.subject}</h1>
            <h4>{mail.body}</h4>
        </div>
    )
}