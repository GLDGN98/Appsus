import { mailService } from "../services/mail.service.js"

const { useState } = React


export function MailCompose() {
    const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '' })


    function handleChange({ target }) {
        let { value, name: field } = target
        setNewMessage((prevMessage) => ({ ...prevMessage, [field]: value }))
    }


    function sendMail(ev) {
        ev.preventDefault()
        mailService.save(newMessage).then(res => console.log(res))

    }



    return (
        <div className="mail-compose">
            <form className="new-mail" onSubmit={sendMail}>
                <h2>New Message</h2>
                <div>
                    <label htmlFor="to">To</label>
                    <input
                        id="to"
                        name="to"
                        type="email"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="subject">Subject</label>
                    <input type="text"
                        id="subject"
                        name="subject"
                        onChange={handleChange}
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
                    />
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}