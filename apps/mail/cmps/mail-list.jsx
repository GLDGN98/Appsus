import { MailPreview } from "./mail-preview.jsx"


export function MailList({ mails, handleDelete, setIsStarredMail }) {
    return (
        <table className="mail-list-container">
            <tbody className="mail-list">
                {mails.map(mail => <MailPreview handleDelete={handleDelete} key={mail.id} mail={mail} mails={mails} setIsStarredMail={setIsStarredMail} />)}
            </tbody>
        </table>
    )
}
