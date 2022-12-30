import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useRef, useEffect } = React
const { useNavigate } = ReactRouterDOM



export function MailCompose({ sendMail, showNewMessage, setShowNewMessage, isDrafted }) {
    const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '', name: 'Mahatma Appsus', from: "user@appsus.com", sentAt: new Date(), removedAt: null, isRead: true, isSent: false })
    const navigate = useNavigate()
    const [toggleExpandMail, setToggleExapndMail] = useState(false)
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

    function onExpandMail() {
        setToggleExapndMail((prev) => !prev)
        const form = formRef.current
        form.classList.toggle('expand-message')

    }

    // <div style={{ visibility: this.state.driverDetails.firstName != undefined? 'visible': 'hidden'}}></div>


    return (
        <div className="mail-compose">
            <form ref={formRef} className={showNewMessage ? 'new-mail active' : "new-mail"} onSubmit={onSendMail}>
                <div className="new-message-header-bg">
                    <div className="new-message-header">
                        <h3>New Message</h3>
                        <div>
                            <i onClick={onExpandMail} class="fa-solid fa-up-right-and-down-left-from-center"></i>
                            <i onClick={() => setShowNewMessage(false)} class="fa-solid fa-xmark"></i>
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
                    <i class="fa-solid fa-trash-can"></i>
                </div>

            </form>
        </div>
    )
}