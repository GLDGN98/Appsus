import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useRef, useEffect } = React
const { useNavigate } = ReactRouterDOM



export function MailCompose({ sendMail, showNewMessage, setShowNewMessage, isDrafted }) {
    const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '', name: 'Mahatma Appsus', from: "user@appsus.com", sentAt: new Date(), removedAt: null, isRead: true, isSent: false })
    const navigate = useNavigate()
    const formRef = useRef(null)
    let mailDraftInterval = useRef(null)



    // useEffect(() => {
    //     console.log(isDrafted)

    //     if (isDrafted === true) {
    //         mailDraftInterval.current = setInterval(() => {
    //             saveDraftedMails(newMessage)
    //         }, 5000)
    //     }

    //     if (isDrafted === false) {
    //         clearInterval(mailDraftInterval.current)
    //         setNewMessage.sentAt = new Date()
    //     }

    // }, [isDrafted])

    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMessage((prevMessage) => ({ ...prevMessage, [field]: value }))
    }


    function onSendMail(ev) {
        ev.preventDefault()
        sendMail(newMessage)
        setShowNewMessage(false)
        navigate('/mail/sent-mail')
        formRef.current.reset();
        showSuccessMsg('Mail sent successfully!')
    }

    //     Add a draft folder – email that is being composed is auto saved every 5 
    // seconds and can be viewed in the draft folder until sent

    // function saveDraftedMails(mail) {
    //     console.log('ho')

    // }


    return (
        <div className="mail-compose">
            <form ref={formRef} className={showNewMessage ? 'new-mail active' : "new-mail"} onSubmit={onSendMail}>
                <div className="new-message-header-bg">
                    <div className="new-message-header">
                        <h3>New Message</h3>
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
                <div>
                    <input
                        id="to"
                        name="to"
                        type="email"
                        onChange={handleChange}
                        placeholder="TO..."
                    />
                </div>
                <div>
                    <input type="text"
                        id="subject"
                        name="subject"
                        onChange={handleChange}
                        placeholder="Subject..."
                    />
                </div>
                <div>
                    <textarea
                        cols={100}
                        rows={30}
                        type="text"
                        id="body"
                        name="body"
                        onChange={handleChange}
                        placeholder="Message..."
                    />
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}