const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()
    const callbackFuncs = { handleChange, onSaveNote }

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
        let { value, type } = target
        console.log(value, type)
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { txt: value } }))
        console.log(value, type)
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit).then((note) => {
            console.log('note saved', note)
            showSuccessMsg('Note Saved')
            navigate('/note')
        })
    }

    return <section className="note-edit">
        <h2>{noteToEdit.id ? 'Edit this note' : 'Add a new note'}</h2>
        { (noteToEdit.id && noteToEdit.type === 'text') && <EditTextNote note={noteToEdit} callbackFuncs={callbackFuncs} />}
        { (noteToEdit.id && noteToEdit.type === 'img') && <EditImageNote note={noteToEdit} callbackFuncs={callbackFuncs} />}
        { (noteToEdit.id && noteToEdit.type === 'todo') && <EditTodoNote note={noteToEdit} callbackFuncs={callbackFuncs} />}

    </section>
}

function EditTextNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    return <form onSubmit={onSaveNote}>
        <label htmlFor="title">Note Text:</label>
        <input type="text" name="txt" id="title" placeholder="Enter text" value={note.info.txt} onChange={handleChange} />
        <div className="edit-actions">
            <button>{note.id ? 'Save' : 'Add'}</button>
            <Link to="/note">Cancel</Link>
        </div>
    </form>

}