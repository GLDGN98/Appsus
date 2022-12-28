import { MailPreview } from "./mail-preview.jsx"


export function MailList({ mails, handleDelete }) {
    return (
        <table>
            <tbody className="mail-list">
                {mails.map(mail => <MailPreview handleDelete={handleDelete} key={mail.id} mail={mail} mails={mails} />)}
            </tbody>
        </table>
    )
}
