const { useState, useEffect } = React

import { NotePreview } from './note-preview.jsx'
import { noteService } from '../services/note.service.js'

export function NoteList({ filterBy }) {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const updateFuncs = {
        onRemoveNote,
        onPinnedNote,
        onUnpinnedNote
    }
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

    function onPinnedNote(pinned) {
        const updatedNotes = notes.filter(note => note.id !== pinned.id)
        updatedNotes.unshift(pinned)
        setNotes(updatedNotes)
    }

    function onUnpinnedNote(unpinned) {
        const updatedNotes = notes.filter(note => note.id !== unpinned.id)
        updatedNotes.push(unpinned)
        setNotes(updatedNotes)
    }

    function onRemoveNote(noteId) {
        const updatedNotes = notes.filter(note => note.id !== noteId)
        setNotes(updatedNotes)
    }
    
    return <div className="notes-list-box flex-row">
        {!isLoading && notes.map(note => <NotePreview updateFuncs={updateFuncs} key={note.id} note={note} />)}
        {isLoading && <div>Loading...</div>}
    </div>

}
