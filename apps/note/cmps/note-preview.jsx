const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function NotePreview({ note, updateFuncs }) {

    let [currNote, setNote] = useState(note)
    let [hovering, setHovering] = useState(false)
    const { onRefreshNotes, onRemoveNote, onPinnedNote, onUnpinnedNote } = updateFuncs
    const style = { backgroundColor: (currNote.style && currNote.style.backgroundColor) ? currNote.style.backgroundColor : '#e7eaf6' }
    const toolsRef = useRef()
    const boxRef = useRef()

    useEffect(() => {
        utilService.animateCSS(boxRef.current, 'zoomIn')
    }, [])

    function onToolsClick(clickData, color = '') {
        const newNote = { ...currNote }
        switch (clickData) {
            case 'unpin':
                newNote.isPinned = false
                onUnpinnedNote(newNote)
                break
            case 'pin':
                newNote.isPinned = true
                onPinnedNote(newNote)
                break
            case 'remove':
                noteService.remove(currNote.id).then(() =>
                    onRemoveNote(currNote.id))
                    showSuccessMsg('Note removed')
                break
            case 'color':
                if (!newNote.style) newNote.style = {}
                newNote.style.backgroundColor = color
                break
            case 'edit':
                break
            case 'copy':
                const copyNote = { ...newNote }
                delete copyNote.id
                noteService.save(copyNote).then(note => {
                    showSuccessMsg('Note copied')
                    if (note) onRefreshNotes()
                })
                break

        }
        if (clickData !== 'remove' && clickData !== 'copy' && clickData !== 'email') {
            noteService.save(newNote)
            setNote(newNote)
        }
    }

    function hideNoteTools() {
        setHovering(false)
    }


    function showNoteTools() {
        setHovering(true)
    }

    useEffect(() => {
        if (hovering) utilService.animateCSS(toolsRef.current, 'fadeIn')

    }, [hovering])




    return <div ref={boxRef} onMouseEnter={(() => showNoteTools())} onMouseLeave={(() => hideNoteTools())} className="note-box" style={{ backgroundColor: style.backgroundColor }}>
        <DynamicCmp onToolsClick={onToolsClick} note={currNote} />
        {hovering && <div ref={toolsRef}> <NoteTools note={currNote} onToolsClick={onToolsClick} hovering={hovering} /> </div>}
    </div>
}


function DynamicCmp({ note, onToolsClick }) {

    switch (note.type) {
        case 'note-txt':
            return <NoteTxt onToolsClick={onToolsClick} note={note} />
        case 'note-todos':
            return <NoteTodo onToolsClick={onToolsClick} note={note} />
        case 'note-img':
            return <NoteImg onToolsClick={onToolsClick} note={note} />
        case 'note-video':
            return <NoteVideo onToolsClick={onToolsClick} note={note} />
        case 'note-audio':
            return <NoteAudio onToolsClick={onToolsClick} note={note} />
        // case 'note-map':
        //     return <NoteMap onToolsClick={onToolsClick} note={note} />
    }
}


function NoteTxt({ note, onToolsClick, isPinned = false }) {
    return <div className="note-text-box flex-col">
        <span className="note-title">{note.info.title}</span>
        <p className="note-text">{note.info.txt}</p>
    </div>
}

// function NoteMap({ note, onToolsClick, isPinned = false }) {
//     return <div className="note-text-box flex-col">
//         {
//             // load map
//         }
//     </div>
// }

function NoteTodo({ note, onToolsClick, isPinned = false }) {
    const todos = noteService.sortTodos(note)
    return <div className="note-todo-box flex-col">
        <span className="note-todo-header">{note.info.label}</span>
        <ul className="note-todo-list">
            {
                todos.map(todo => {
                    let spanClass = 'todo-item-text'
                    spanClass += (isTodoDone(todo)) ? ' done' : ''
                    return <li key={todo.txt} >
                        <span className={spanClass}>{todo.txt}</span>
                        {isTodoDone(todo) && <i className="todo-checked fa-sharp fa-solid fa-check"></i>}
                    </li>
                })
            }
        </ul >
    </div >

    function isTodoDone(todo) {
        return (todo.doneAt !== null)
    }
}



function NoteImg({ note, onToolsClick, isPinned = false }) {
    return <div className="note-img-box flex-col">
        <span className="note-image-title">{note.info.title}</span>
        <img className="note-img" src={note.info.url} />

    </div>
}


function NoteAudio({ note, onToolsClick, isPinned = false }) {
    return <div className="note-img-box flex-col">
        <span className="note-image-title">{note.info.title}</span>
        <audio controls>
            <source src={note.info.url} />
        </audio>
    </div>
}


function NoteVideo({ note, onToolsClick, isPinned = false }) {
    const url = 'https://www.youtube.com/embed/' + getId(note.info.url)
    return <div className="note-video-box flex-col">
        <iframe src={url} frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

        </iframe>
    </div>

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }
}


function NoteTools({ note, onToolsClick, hovering }) {
    const isPinned = (note.isPinned) ? note.isPinned : false

    return <div className="note-tools flex-row">
        <i title="Remove note" onClick={() => onToolsClick('remove')} className="fa-sharp fa-solid fa-trash"></i>
        <Link to={`/note/edit/${note.id}`}>
            <i title="Edit not" onClick={() => onToolsClick('edit')} className="fa-solid fa-pen-to-square"></i>
        </Link>
        <i onClick={() => onToolsClick('copy')} title="Duplicate note" className="fa-solid fa-clone"></i>
        <label title="Change note color">
            <i className="fa-solid fa-palette">
                <input className="note-color-tool" type='color' onChange={(ev) => onToolsClick('color', ev.target.value)}></input>
            </i>
        </label>
        <Link to={noteService.getNoteMailURL(note)}>
            <i onClick={() => onToolsClick('email')} className="fa-sharp fa-solid fa-envelope"></i>
        </Link>
        {isPinned && <i title="Remove pin" onClick={() => onToolsClick('unpin')} className="fa-solid fa-thumbtack pinned"></i>}
        {!isPinned && <i title="Add pin" onClick={() => onToolsClick('pin')} className="fa-solid fa-thumbtack"></i>}
    </div>
}

