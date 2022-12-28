const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"

export function NoteIndex() {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    return <div>
            <section className="search">
                
            </section>
            <NoteList filterBy={filterBy} />
        </div>

}
