const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"

import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"

import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { NoteEdit } from "./apps/note/cmps/note-edit.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"


export function App() {
    return <Router>

        <section className="app flex-col">
            <AppHeader />
            <main className="flex-row">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} >
                        <Route path="/mail/inbox/:id" element={<MailDetails />} />
                    </Route>
                    <Route path="/mail/:type" element={<MailIndex />} />
                    <Route path="/mail/inbox/:id" element={<MailDetails />} />

                    <Route path="/note" element={<NoteIndex />} />
                    <Route path="/note/edit" element={<NoteEdit />} />
                    <Route path="/note/edit/:noteId" element={<NoteEdit />} />

                </Routes>
            </main>
            <UserMsg />
        </section>
    </Router>
}
