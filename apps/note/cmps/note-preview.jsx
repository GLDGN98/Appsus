const { useState, useEffect } = React

export function NotePreview({ note }) {
    return <div className="note-box">Note : {note.id}</div>
}