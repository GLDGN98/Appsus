import { MailPreview } from "./mail-preview.jsx"


export function MailList({ mails }) {
    return (
        <table>
            <tbody className="mail-list">
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
            </tbody>
        </table>
    )

}
