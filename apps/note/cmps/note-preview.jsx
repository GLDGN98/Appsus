const { useState, useEffect } = React

export function NotePreview({ note }) {
    return <div className="note-box">
        <DynamicCmp note={note} />
    </div>
}


function DynamicCmp({ note }) {

    function onToolsClick(clickData) {
        console.log(note.id, clickData)
    }

    switch (note.type) {
        case 'note-txt':
            return <NoteTxt onToolsClick={onToolsClick} note={note} />
        case 'note-todos':
            return <NoteTodo onToolsClick={onToolsClick} note={note} />
        case 'note-img':
            return <NoteImg onToolsClick={onToolsClick} note={note} />
    }
}

function NoteTxt({ note, onToolsClick }) {
    return <div className="note-text-box flex-col">
        <span className="note-text">{note.info.txt}</span>
        <NoteTools onToolsClick={onToolsClick} />
    </div>
}

function NoteTodo({ note, onToolsClick }) {
    return <div className="note-todo-box flex-col">
        <span className="note-todo-header">{note.info.label}</span>
        <ul className="note-todo-list">
            {

                note.info.todos.map(todo => {
                    let spanClass = 'todo-item-text'
                    spanClass += (isTodoDone(todo)) ? ' done' : ''
                    return <li key={todo.txt} >
                        <span className={spanClass}>{todo.txt}</span>
                        {isTodoDone(todo) && <i className="todo-checked fa-sharp fa-solid fa-check"></i>}
                    </li>
                })
            }
        </ul >
        <NoteTools onToolsClick={onToolsClick} />
    </div >

    function isTodoDone(todo) {
        return (todo.doneAt !== null)
    }
}

function NoteImg({ note, onToolsClick }) {
    return <div className="note-img-box flex-col">
        <span className="note-image-title">{note.info.title}</span>
        <img src={note.info.url}/>
        <NoteTools onToolsClick={onToolsClick} />
    </div>
}

function NoteTools({ onToolsClick }) {
    return <div className="note-tools flex-row">
        <i onClick={() => onToolsClick('trash')} className="fa-duotone fa-trash"></i>
    </div>
}