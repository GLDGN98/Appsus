const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        if (!noteId) return
        loadNote()
    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then((note) => setNoteToEdit(note))
            .catch((err) => {
                console.log('Had issues in note details', err)
                navigate('/note')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field} = target
        console.log(value, type, field)
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit).then((note) => {
            console.log('note saved' , note)
            showSuccessMsg('Note Saved')
            navigate('/note')
        })
    }

    return <section className="note-edit">
        <h2>{noteToEdit.id ? 'Edit this note' : 'Add a new note'}</h2>
        <input type="text" name="title" id="title" placeholder="Enter text" value={noteToEdit.txt} onChange={handleChange} />
    </section>


}