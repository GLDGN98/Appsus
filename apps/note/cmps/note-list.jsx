const { useState, useEffect } = React

import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {

    useEffect(() => {

    }, [])

    return <div>
        {
            notes.map(note => <NotePreview key={note.id} note={note} />)
        }
    </div>

}
