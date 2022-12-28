const { useState, useEffect } = React

import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {
    let isEmptyList
    useEffect(() => {
        console.log(notes)
    }, [])

    return <div>
        {
            notes.map(note => <NotePreview key={note.id} note={note} />)
        }
        note list  {isEmptyList}</div>

}
