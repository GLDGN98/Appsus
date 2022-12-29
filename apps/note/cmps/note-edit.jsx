const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService, showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(null)
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

        let { value, id } = target

        if (noteToEdit.type === 'note-txt') {
            setNoteToEdit((prevNote) => ({ ...prevNote, info: { txt: value } }))
        }

        else if (noteToEdit.type === 'note-img') {
            if (id === 'note-img-title') setNoteToEdit((prevNote) => ({ ...prevNote, info: { title: value, url: prevNote.info.url } }))
            else if (id === 'note-img-url') setNoteToEdit((prevNote) => ({ ...prevNote, info: { url: value, title: prevNote.info.title } }))
        }

        else if (noteToEdit.type === 'note-todos') {

            let { name } = target

            if (name === 'todos-title') {
                setNoteToEdit((prevNote) => {
                    console.log(prevNote)
                    let info = prevNote.info
                    console.log(info)
                    info = { ...info, label: value }
                    return ({ ...prevNote, info })
                })
            }

            else if (name === 'todo') {
                setNoteToEdit((prevNote) => {
                    id--
                    const todos = prevNote.info.todos
                    let todo = todos[id]
                    todo = { ...todo, txt: value }
                    todos[id] = todo
                    console.log(todo, todos)
                    return ({ ...prevNote, info: { label: prevNote.info.label, todos } })
                })
            }
        }

    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit).then((note) => {
            console.log('note saved', note)
            showSuccessMsg('Note Saved')
            navigate('/note')
        })
    }


    function onTypeSelect(type) {
        const note = noteService.getEmptyNote(type)
        console.log(note)
        setNoteToEdit(note)
    }

    return <section className="note-editor flex-col">
        {(noteToEdit) && <h2>{(noteToEdit.id) ? 'Edit this note' : 'Add a new note'}</h2>}
        {(noteToEdit) && <DynamicEditNoteCmp note={noteToEdit} callbackFuncs={callbackFuncs} />}
        {(!noteToEdit) && <span className="choose-type-add-note">Choose type of the note to add</span>}
        {(!noteToEdit) && <TypeMenu onTypeSelect={onTypeSelect} />}
    </section>
}

function TypeMenu({ onTypeSelect }) {
    let iconText = 'fa-sharp fa-solid fa-font'
    let iconImg = "fa-solid fa-image"
    let iconTodo = "fa-solid fa-list"
    let iconVideo = "fa-brands fa-youtube"

    return <nav className="types-menu flex-row">
        <i title="Text type" onClick={() => { onTypeSelect('txt') }} className={iconText}></i>
        <i title="Image type" onClick={() => { onTypeSelect('img') }} className={iconImg}></i>
        <i title="Video type" onClick={() => { onTypeSelect('video') }} className={iconVideo}></i>
        <i title="Todos type" onClick={() => { onTypeSelect('todos') }} className={iconTodo}></i>
    </nav>
}


function DynamicEditNoteCmp({ note, callbackFuncs }) {
    switch (note.type) {
        case 'note-txt':
            return <EditTextNote note={note} callbackFuncs={callbackFuncs} />
        case 'note-todos':
            return <EditTodoNote note={note} callbackFuncs={callbackFuncs} />
        case 'note-img':
            return <EditImageNote note={note} callbackFuncs={callbackFuncs} />
    }
}


function EditTextNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    return <form onSubmit={onSaveNote}>
        <label htmlFor="title">Note Text:</label>
        <input type="text" id="title" placeholder="Enter text" value={note.info.txt} onChange={handleChange} />
        <div className="edit-actions">
            <button>{note.id ? 'Save' : 'Add'}</button>
            <Link to="/note">Cancel</Link>
        </div>
    </form>

}


function EditImageNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    return <form onSubmit={onSaveNote}>
        <label htmlFor="title">Note Title:</label>
        <input type="text" id="note-img-title" placeholder="Enter text" value={note.info.title} onChange={handleChange} />

        <label htmlFor="note-img-url">Image URL:</label>
        <input type="text" id="note-img-url" placeholder="Enter url" value={note.info.url} onChange={handleChange} />
        <div className="edit-actions">
            <button>{note.id ? 'Save' : 'Add'}</button>
            <Link to="/note">Cancel</Link>
        </div>
    </form>

}


function EditTodoNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    let count = 0
    return <form onSubmit={onSaveNote}>
        <label htmlFor="todos-title">Todo title:</label>
        <input name="todos-title" type="text" id="todos-title" placeholder="Enter todo title" value={note.info.label} onChange={handleChange} />
        {
            note.info.todos.map(todo =>
                <div key={`todo-${count++}`} className="todo-box-editor">
                    <label key={`label-${count}`} htmlFor={count}>Todo tasks:</label>
                    <input name="todo" key={count} type="text" id={count} placeholder="Enter todo title" value={todo.txt} onChange={handleChange} />
                </div>)
        }
        <div className="edit-actions">
            <button>{note.id ? 'Save' : 'Add'}</button>
            <Link to="/note">Cancel</Link>
        </div>
    </form>

}