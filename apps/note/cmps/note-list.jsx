const { useState, useEffect } = React

import { NotePreview } from './note-preview.jsx'
import { noteService } from '../services/note.service.js'

export function NoteList({ notes, filterBy }) {
    const [currNotes, setNotes] = useState(notes)
    const updateFuncs = {
        onRemoveNote,
        onPinnedNote,
        onUnpinnedNote
    }

    function onPinnedNote(pinned) {
        const updatedNotes = currNotes.filter(note => note.id !== pinned.id)
        updatedNotes.unshift(pinned)
        setNotes(updatedNotes)
    }

    function onUnpinnedNote(unpinned) {
        const updatedNotes = currNotes.filter(note => note.id !== unpinned.id)
        updatedNotes.push(unpinned)
        setNotes(updatedNotes)
    }

    function onRemoveNote(noteId) {
        const updatedNotes = currNotes.filter(note => note.id !== noteId)
        setNotes(updatedNotes)
    }
    
    return <div className="notes-list-box flex-row">
        {currNotes.map(note => <NotePreview updateFuncs={updateFuncs} key={note.id} note={note} />)}
    </div>

}
