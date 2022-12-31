const { useState, useEffect } = React
const { useNavigate, useParams, Link, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
// import { Map, Marker } from "./map.jsx"

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(null)
    const navigate = useNavigate()
    const { noteId } = useParams()
    const callbackFuncs = { handleChange, onSaveNote }
    const [params] = useSearchParams()
    console.log(noteToEdit)

    let labels = [
        {
            label: 'Critical',
            state: noteToEdit?noteToEdit.labels.critical : false
        },
        {
            label: 'Family',
            state: noteToEdit?noteToEdit.labels.family : false
        },
        {
            label: 'Work',
            state: noteToEdit?noteToEdit.labels.work : false
        },
        {
            label: 'Friends',
            state: noteToEdit?noteToEdit.labels.friends : false
        },
        {
            label: 'Spam',
            state: noteToEdit?noteToEdit.labels.spam : false
        },
        {
            label: 'Memories',
            state: noteToEdit?noteToEdit.labels.memories : false
        },
        {
            label: 'Romantic',
            state: noteToEdit?noteToEdit.labels.romantic : false
        }
    ]

    useEffect(() => {
        if (!noteId) {

            const type = params.get('type')
            if (type && isValidType(type)) return getParamsNote(type)
            else return
        }
        loadNote()
    }, [])

    

    function isValidType(type) {
        return (type === 'txt' || type === 'video' || type === 'audio' || type === 'img' || type === 'todos')
    }

    function loadNote() {
        noteService.get(noteId)
            .then((note) => {
                setNoteToEdit(note)
            })
            .catch((err) => {
                console.log('Had issues in note details', err)
                navigate('/note')
            })
    }


    function handleChange({ labels, target }) {

        // if (labels) {
        //     console.log(labels)
        //     setNoteToEdit((prevNote) => ({ ...prevNote, labels: { ...prevNote.labels, [labels.name.toLowerCase()]: labels.value } }))
        //     return
        // }

        let { value, id } = target
        if (noteToEdit.type === 'note-txt') {
            if (id === 'txt-title') setNoteToEdit((prevNote) => ({ ...prevNote, info: { title: value, txt: prevNote.info.txt } }))
            else if (id === 'txt-txt') setNoteToEdit((prevNote) => ({ ...prevNote, info: { txt: value, title: prevNote.info.title } }))
        }

        else if (noteToEdit.type === 'note-img') {
            if (id === 'note-img-title') setNoteToEdit((prevNote) => ({ ...prevNote, info: { title: value, url: prevNote.info.url } }))
            else if (id === 'note-img-url') setNoteToEdit((prevNote) => ({ ...prevNote, info: { url: value, title: prevNote.info.title } }))
        }

        else if (noteToEdit.type === 'note-audio') {
            if (id === 'note-audio-title') setNoteToEdit((prevNote) => ({ ...prevNote, info: { title: value, url: prevNote.info.url } }))
            else if (id === 'note-audio-url') setNoteToEdit((prevNote) => ({ ...prevNote, info: { url: value, title: prevNote.info.title } }))
        }

        else if (noteToEdit.type === 'note-video') {
            setNoteToEdit((prevNote) => ({ ...prevNote, info: { url: value } }))
        }

    }


    function onSaveNote(ev, newSave) {
        ev.preventDefault()
        noteService.save(newSave).then((note) => {
            console.log('note saved', note)
            showSuccessMsg('Note Saved')
            navigate('/note')
        })
    }

    function getParamsNote(type) {
        const note = noteService.getEmptyNote(type)
        note.info.txt = params.get('txt')
        note.info.title = params.get('title')
        // console.log(note)
        setNoteToEdit(note)
    }


    function onTypeSelect(type) {
        const note = noteService.getEmptyNote(type)
        console.log(note)
        setNoteToEdit(note)
    }

    return <section className="note-editor flex-col">
        {(noteToEdit) && <div className="editor-box">
            <span className="editor-desc">{(noteToEdit.id) ? 'Edit this note' : 'Add a new note'}</span>
            <DynamicEditNoteCmp note={noteToEdit} callbackFuncs={callbackFuncs} />
            {/* <div className="labels-editor">
                {
                    labels.map(label => <Label callbackFuncs={callbackFuncs} label={label.label} state={noteToEdit.labels[label.label.toLowerCase()]} />)
                }
            </div> */}
        </div>}

        {(!noteToEdit) && <span className="choose-type-add-note">Choose type of the note to add</span>}
        {(!noteToEdit) && <TypeMenu onTypeSelect={onTypeSelect} />}
    </section>
}

function TypeMenu({ onTypeSelect }) {
    const iconText = 'fa-sharp fa-solid fa-font'
    const iconImg = "fa-solid fa-image"
    const iconTodo = "fa-solid fa-list"
    const iconVideo = "fa-brands fa-youtube"
    const iconAudio = "fa-sharp fa-solid fa-microphone"
    // const iconMap = "fa-sharp fa-solid fa-location-dot"

    return <nav className="types-menu flex-row">
        <i title="Text type" onClick={() => { onTypeSelect('txt') }} className={iconText}></i>
        <i title="Image type" onClick={() => { onTypeSelect('img') }} className={iconImg}></i>
        <i title="Video type" onClick={() => { onTypeSelect('video') }} className={iconVideo}></i>
        <i title="Todos type" onClick={() => { onTypeSelect('todos') }} className={iconTodo}></i>
        <i title="Audio type" onClick={() => { onTypeSelect('audio') }} className={iconAudio}></i>
        {/* <i title="Map type" onClick={() => { onTypeSelect('map') }} className={iconMap}></i> */}
    </nav>
}


function DynamicEditNoteCmp({ note, callbackFuncs }) {
    // console.log(note)
    switch (note.type) {
        case 'note-txt':
            return <EditTextNote note={note} callbackFuncs={callbackFuncs} />
        case 'note-todos':
            return <EditTodoNote note={note} callbackFuncs={callbackFuncs} />
        case 'note-img':
            return <EditImageNote note={note} callbackFuncs={callbackFuncs} />
        case 'note-video':
            return <EditVideoNote note={note} callbackFuncs={callbackFuncs} />
        case 'note-audio':
            return <EditAudioNote note={note} callbackFuncs={callbackFuncs} />
        // case 'note-map':
        //     return <EditMapNote note={note} callbackFuncs={callbackFuncs} />
    }
}


function EditTextNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    let count = 0
    return <form className="note-editor-form" onSubmit={(ev) => onSaveNote(ev, note)}>
        <table className="form-table">
            <tbody>
                <tr key={count}>
                    <td className="note-editor-td">
                        <label htmlFor="txt-title">Note Title</label>
                    </td>
                    <td className="note-editor-td">
                        <input type="text" id="txt-title" placeholder="Enter title" value={note.info.title} onChange={handleChange} />
                    </td>
                </tr>
                <tr key={++count}>

                    <td className="note-editor-td">
                        <label htmlFor="txt-txt">Note Text</label>
                    </td>
                    <td className="note-editor-td">
                        <input type="text" id="txt-txt" placeholder="Enter text" value={note.info.txt} onChange={handleChange} />
                    </td>
                </tr>
                <tr key={++count}>
                    <td className="editor-link">
                        <button>{note.id ? 'Save' : 'Add'}</button>
                    </td>
                    <td className="editor-link">
                        <Link to="/note">Cancel</Link>
                    </td>
                </tr>
            </tbody>
        </table >
    </form >

}

// function EditMapNote({ note, callbackFuncs }) {
//     const { handleChange, onSaveNote } = callbackFuncs
//     let count = 0
//     let lat = note.info.lat
//     let lng = note.info.lng
//     const elMapRef = useRef(null)

//     return <form className="note-editor-form" onSubmit={(ev) => onSaveNote(ev, note)}>
//         <div className="map-box" ref={elMapRef}>
//             <Wrapper apiKey={"AIzaSyCDYeMm_dibJ0MJsnPjtYTDIfZPaxKjif4"} render={render}>
//                 <Map center={{ lat, lng }} zoom={15}>
//                     <Marker position={{ lat, lng }} />
//                 </Map>
//             </Wrapper>
//         </div>
//         <table>
//             <tbody>
//                 <tr key={count++}>
//                     <td className="editor-link">
//                         <button>{note.id ? 'Save' : 'Add'}</button>
//                     </td>
//                     <td className="editor-link">
//                         <Link to="/note">Cancel</Link>
//                     </td>
//                 </tr>
//             </tbody>
//         </table >
//     </form >

// }

function EditImageNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    let count = 0
    return <form className="note-editor-form flex-col" onSubmit={(ev) => onSaveNote(ev, note)}>
        <table className="form-table">
            <tbody>

                <tr key={count++}>
                    <td className="note-editor-td">
                        <label htmlFor="title">Note Title</label>
                    </td>
                    <td className="note-editor-td">
                        <input type="text" id="note-img-title" placeholder="Enter text" value={note.info.title} onChange={handleChange} />
                    </td>
                </tr>

                <tr key={count++}>
                    <td className="note-editor-td">
                        <label htmlFor="note-img-url">Image URL</label>
                    </td>
                    <td className="note-editor-td">

                        <input type="text" id="note-img-url" placeholder="Enter url" value={note.info.url} onChange={handleChange} />
                    </td>
                </tr>

                <tr key={count++}>
                    <td className="editor-link">
                        <button>{note.id ? 'Save' : 'Add'}</button>
                    </td>
                    <td className="editor-link">
                        <Link to="/note">Cancel</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>

}

function EditAudioNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    let count = 0
    return <form className="note-editor-form flex-col" onSubmit={(ev) => onSaveNote(ev, note)}>
        <table className="form-table">
            <tbody>

                <tr key={count++}>
                    <td className="note-editor-td">
                        <label htmlFor="title">Note Title</label>
                    </td>
                    <td className="note-editor-td">
                        <input type="text" id="note-audio-title" placeholder="Enter text" value={note.info.title} onChange={handleChange} />
                    </td>
                </tr>

                <tr key={count++}>
                    <td className="note-editor-td">
                        <label htmlFor="note-img-url">Audio URL</label>
                    </td>
                    <td className="note-editor-td">

                        <input type="text" id="note-audio-url" placeholder="Enter url" value={note.info.url} onChange={handleChange} />
                    </td>
                </tr>

                <tr key={count++}>
                    <td className="editor-link">
                        <button>{note.id ? 'Save' : 'Add'}</button>
                    </td>
                    <td className="editor-link">
                        <Link to="/note">Cancel</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>

}

function EditVideoNote({ note, callbackFuncs }) {
    const { handleChange, onSaveNote } = callbackFuncs
    let count = 0
    return <form className="note-editor-form flex-col" onSubmit={(ev) => onSaveNote(ev, note)}>
        <table className="form-table">
            <tbody>
                <tr key={count++}>
                    <td className="note-editor-td">
                        <label htmlFor="note-img-url">Video URL</label>
                    </td>
                    <td className="note-editor-td">

                        <input type="text" id="note-img-url" placeholder="Enter url" value={note.info.url} onChange={handleChange} />
                    </td>
                </tr>

                <tr key={count++}>
                    <td className="editor-link">
                        <button>{note.id ? 'Save' : 'Add'}</button>
                    </td>
                    <td className="editor-link">
                        <Link to="/note">Cancel</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>

}

function EditTodoNote({ note, callbackFuncs }) {
    const { onSaveNote } = callbackFuncs
    const [currNote, setNote] = useState(note)
    let count = 0

    function handleChange({ target }) {
        let { name, value, dataset, checked } = target
        let id = dataset.idx

        if (name === 'todos-title') {
            setNote((prevNote) => {
                let info = prevNote.info
                info = { ...info, label: value }
                return ({ ...prevNote, info })
            })
        }

        else if (name === 'todo') {
            setNote((prevNote) => {
                id--
                const todos = prevNote.info.todos
                let todo = todos[id]
                todo = { ...todo, txt: value }
                todos[id] = todo
                return ({ ...prevNote, info: { label: prevNote.info.label, todos } })
            })
        }

        else if (name === 'todo-check') {
            setNote((prevNote) => {
                id--
                const todos = prevNote.info.todos
                let todo = todos[id]
                let doneAt = (checked) ? new Date().getTime() : null
                todos[id] = { ...todo, doneAt }
                return ({ ...prevNote, info: { label: prevNote.info.label, todos } })
            })
        }

        else if (name === 'todo-remove') {
            setNote((prevNote) => {
                id--
                const todos = prevNote.info.todos
                todos.splice(id, 1)
                return ({ ...prevNote, info: { label: prevNote.info.label, todos } })
            })
        }
    }
    function addLine() {
        currNote.info.todos.push(noteService.getNewTodo())
        const newNote = { ...currNote }
        setNote(newNote)
    }

    return <form className="note-editor-form" onSubmit={(ev) => onSaveNote(ev, currNote)}>
        <table className="form-table">
            <tbody>
                <tr key={'tr-' + count}>
                    <td className="note-editor-td-label">
                        <label htmlFor="todos-title">Todo title</label>
                    </td>
                    <td className="note-editor-td">
                        <input name="todos-title" type="text" id="todos-title" placeholder="Enter todo title" value={currNote.info.label} onChange={handleChange} />
                    </td>
                </tr>
                {
                    currNote.info.todos.map(todo =>
                        <tr key={'tr-' + (++count)} className="">
                            <td className="note-editor-td-label">
                                <label key={`label-${count}`} htmlFor={count}>Todo task</label>
                            </td>
                            <td className="note-editor-td">
                                <input name="todo" key={'text' + count} type="text" data-idx={count} id={'txt-' + count} placeholder="Enter todo title" value={todo.txt} onChange={handleChange} />
                            </td>
                            <td className="note-editor-td-check">
                                <input name="todo-check" key={'check' + count} type="checkbox" data-idx={count} id={'checkbox-' + count} checked={(todo.doneAt === null) ? false : true} onChange={handleChange} />
                            </td>
                            <td className="note-editor-td-remove">
                                <button name="todo-remove" data-idx={count} onClick={handleChange}>x</button>
                            </td>

                        </tr>)
                }
                <tr key={'tr-' + (++count)}>
                    <td onClick={() => addLine()} className="add-line">
                        <span>Add Line</span>
                    </td>
                    <td className="editor-link">
                        <button>{currNote.id ? 'Save' : 'Add'}</button>
                    </td>
                    <td className="editor-link">
                        <Link to="/note">Cancel</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </form >

}

// function Label({ label, state, callbackFuncs }) {
//     const [currState, setState] = useState(state)
//     const style = getLabelStyle(currState)
//     const { handleChange } = callbackFuncs
//     const className = 'labels-editor' + currState ? ' on' : ''

//     function getLabelStyle(state) {
//         const color = noteService.getLabelsColors(label)
//         if (state) return { border: '3px solid ' + color, backgroundColor: color, color: 'white' }
//         else return { border: '3px outset ' + color, backgroundColor: 'white', color: color }
//     }

//     function toggleLabel(label) {
//         handleChange({ labels: { name: label, value: !currState } })
//         setState(!currState)
//     }

//     return <span onClick={() => toggleLabel(label)} className={className} style={style}>{label}</span>
// }