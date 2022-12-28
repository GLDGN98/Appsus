const { useState , useEffect } = React

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"

export function NoteIndex() {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        setIsLoading(true)
        noteService.query()
        .then((notes) => {
            setNotes(notes)
            setIsLoading(false)
        })
    }

    return <div>note app
        {!isLoading && <NoteList notes={notes}/>}
        {isLoading && <div>Loading...</div>}
        {(!notes.length && !isLoading) && <div>No notes to show</div>}
    </div>

}
