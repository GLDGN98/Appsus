import { mailService } from "../services/mail.service.js"
const { useState } = React


export function MailCompose({ sendMail, showNewMessage }) {
    const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '', name: 'Mahatma Appsus', from: "user@appsus.com", sentAt: new Date().toLocaleDateString() })


    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMessage((prevMessage) => ({ ...prevMessage, [field]: value }))
    }



    function onSendMail(ev) {
        ev.preventDefault()
        sendMail(newMessage)
    }

    return (
        <div className="mail-compose">
            <form className={showNewMessage ? 'new-mail active' : "new-mail"} onSubmit={onSendMail}>
                <h3>New Message</h3>
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