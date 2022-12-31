import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useRef, useEffect } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

import { eventBusService } from "../../../services/event-bus.service.js"

export function MailCompose({ sendMail, showNewMessage, setShowNewMessage, isDrafted, setIsDrafted }) {
    const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '', name: 'Mahatma Appsus', from: "user@appsus.com", sentAt: new Date(), removedAt: null, isRead: true, isSent: false })
    const navigate = useNavigate()
    const [toggleExpandMail, setToggleExapndMail] = useState(false)
    const [draftMail, setDraftMail] = useState({})
    const formRef = useRef(null)
    const subjectRef = useRef(null)
    const bodyRef = useRef(null)
    let mailDraftInterval = useRef(null)


    useEffect(() => {
        eventBusService.on('params-mail-loaded', (mail) => {
            const newMail = { ...newMessage, subject: mail.title, body: mail.body }
            console.log(newMail)
            setNewMessage(newMail)
            if (subjectRef.current !== null && bodyRef.current.value !== null) {
                subjectRef.current.value = mail.title
                bodyRef.current.value = mail.body
            }
        })
    }, [])

    useEffect(() => {
        if (isDrafted === true) {
            mailDraftInterval.current = setInterval(() => {
                saveDraftedMails()
            }, 5000)
        }
        if (isDrafted === false) {
            if (draftMail.body && draftMail.subject) {
                mailService.save(draftMail)
            }
            clearInterval(mailDraftInterval.current)
        }
    }, [isDrafted])

    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMessage((prevMessage) => ({ ...prevMessage, [field]: value }))
    }

    function saveDraftedMails() {
        const to = formRef.current[0].value
        const subject = formRef.current[1].value
        const body = formRef.current[2].value
        const draftMail = ({ ...newMessage, to, body, subject })
        setDraftMail(draftMail)
    }

    function onSendMail(ev) {
        ev.preventDefault()
        sendMail({ ...newMessage, isSent: true })
        setShowNewMessage(false)
        navigate('/mail/sent-mail')
        formRef.current.reset();
    }

    function onExpandMail() {
        setToggleExapndMail((prev) => !prev)
        const form = formRef.current
        form.classList.toggle('expand-message')

    }

    function onCloseMailMessage() {
        setShowNewMessage(false)
        setIsDrafted(false)
    }

    return (
        <div className="mail-compose">
            <form ref={formRef} className={showNewMessage ? 'new-mail active' : "new-mail"} onSubmit={onSendMail}>
                <div className="new-message-header-bg">
                    <div className="new-message-header">
                        <h3>New Message</h3>
                        <div>
                            <i onClick={onExpandMail} className="fa-solid fa-up-right-and-down-left-from-center"></i>
                            <i onClick={onCloseMailMessage} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>

                </div>
                <div>
                    <input
                        required
                        id="to"
                        name="to"
                        type="email"
                        onChange={handleChange}
                        placeholder="TO..."
                    />
                </div>
                <div>
                    <input type="text"
                        ref={subjectRef}
                        id="subject"
                        name="subject"
                        onChange={handleChange}
                        placeholder="Subject..."
                        required
                    />
                </div>
                <div style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <textarea
                        ref={bodyRef}
                        required
                        cols={100}
                        rows={30}
                        type="text"
                        id="body"
                        name="body"
                        onChange={handleChange}
                        placeholder="Message..."
                    />
                </div>
                <div className="new-mail-buttons">
                    <button>Send</button>
                    <i className="fa-solid fa-trash-can"></i>
                </div>

            </form>
        </div>
    )
}