const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { AppFooter } from "./cmps/app-footer.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { MailDraft } from "./apps/mail/cmps/mail-draft.jsx"
import { MailInbox } from "./apps/mail/cmps/mail-inbox.jsx"
import { MailStarred } from "./apps/mail/cmps/mail-starred.jsx"
import { MailSent } from "./apps/mail/cmps/mail-sent.jsx"
import { MailTrash } from "./apps/mail/cmps/mail-trash.jsx"


export function App() {
    return <Router>
        
        <section className="app flex-col">
            <AppHeader />
            <main className="main-layout full flex-col">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />}>
                        <Route path="/mail/inbox" element={<MailInbox />} />
                        <Route path="/mail/starred" element={<MailStarred />} />
                        <Route path="/mail/sent-email" element={<MailSent />} />
                        <Route path="/mail/drafts" element={<MailDraft />} />
                        <Route path="/mail/trash" element={<MailTrash />} />
                    </Route>

                    <Route path="/mail/:id" element={<MailDetails />} />
                    <Route path="/note" element={<NoteIndex />} />
                </Routes>
            </main>
        </section>
    </Router>
}
