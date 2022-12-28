const { useState, useEffect } = React

import { NotePreview } from './note-preview.jsx'
import { noteService } from '../services/note.service.js'

export function NoteList({ filterBy }) {
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

    function onRemoveNote(noteId) {
        const updatedNotes = notes.filter(note => note.id !== noteId)
        setNotes(updatedNotes)
    }

    return <div>
        {!isLoading && notes.map(note => <NotePreview onRemoveNote={onRemoveNote} key={note.id} note={note} />)}
        {isLoading && <div>Loading...</div>}
    </div>

}
