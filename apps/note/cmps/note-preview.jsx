const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"

export function NotePreview({ note, updateFuncs }) {

    let [currNote, setNote] = useState(note)
    const { onRemoveNote, onPinnedNote, onUnpinnedNote } = updateFuncs
    const style =  { backgroundColor : (currNote.style && currNote.style.backgroundColor) ? currNote.style.backgroundColor : '#e7eaf6' }

    function onToolsClick(clickData, color = '') {
        const newNote = { ...currNote }
        console.log(clickData, color)
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
                break
            case 'color':
                if(!newNote.style) newNote.style = {}
                newNote.style.backgroundColor = color
                break
        }
        if (clickData !== 'remove') noteService.save(newNote)
        setNote(newNote)
    }

    return <div className="note-box" style={{ backgroundColor : style.backgroundColor }}>
        <DynamicCmp onToolsClick={onToolsClick} note={currNote} />
    </div>
}


function DynamicCmp({ note, onToolsClick }) {


    const isPinned = (note.isPinned) ? note.isPinned : false
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt isPinned={isPinned} onToolsClick={onToolsClick} note={note} />
        case 'note-todos':
            return <NoteTodo isPinned={isPinned} onToolsClick={onToolsClick} note={note} />
        case 'note-img':
            return <NoteImg isPinned={isPinned} onToolsClick={onToolsClick} note={note} />
    }
}

function NoteTxt({ note, onToolsClick, isPinned = false }) {
    return <div className="note-text-box flex-col">
        <span className="note-text">{note.info.txt}</span>
        <NoteTools isPinned={isPinned} onToolsClick={onToolsClick} />
    </div>
}

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
        <NoteTools isPinned={isPinned} onToolsClick={onToolsClick} />
    </div >

    function isTodoDone(todo) {
        return (todo.doneAt !== null)
    }
}

function NoteImg({ note, onToolsClick, isPinned = false }) {
    return <div className="note-img-box flex-col">
        <span className="note-image-title">{note.info.title}</span>
        <img src={note.info.url} />
        <NoteTools isPinned={isPinned} onToolsClick={onToolsClick} />
    </div>
}

function NoteTools({ onToolsClick, isPinned = false }) {
    return <div className="note-tools flex-row">
        <i onClick={() => onToolsClick('remove')} className="fa-sharp fa-solid fa-trash"></i>
        <i onClick={() => onToolsClick('mail')} className="fa-sharp fa-solid fa-envelope"></i>
        <label>
            <i className="fa-solid fa-palette">
                <input className="note-color-tool" type='color' onChange={(ev) => onToolsClick('color', ev.target.value)}></input>
            </i>
        </label>
        <i onClick={() => onToolsClick('edit')} className="fa-solid fa-pen-to-square"></i>
        {isPinned && <i onClick={() => onToolsClick('unpin')} className="fa-solid fa-thumbtack"></i>}
        {!isPinned && <i onClick={() => onToolsClick('pin')} className="fa-regular fa-thumbtack"></i>}
    </div>
}

function InputColor() {

}