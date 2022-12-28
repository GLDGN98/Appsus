const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    let [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    let iconText = 'fa-sharp fa-solid fa-font'
    let iconImg = "fa-solid fa-image"
    let iconTodo = "fa-solid fa-list" 
    let iconVideo = "fa-brands fa-youtube"
    _setFilterIconsClasses()

    useEffect(() => {
        loadNotes()
    }, [])

    useEffect(() => {
        _setFilterIconsClasses()
        loadNotes()

    }, [filterBy])

    function _setFilterIconsClasses() {
        if (filterBy.type === 'text') iconText += ' active'
        else if (filterBy.type === 'todo') iconTodo += ' active'
        else if (filterBy.type === 'img') iconImg += ' active'
        else if (filterBy.type === 'video') iconVideo += ' active'
    }

    function loadNotes() {
        setIsLoading(true)
        noteService.query(filterBy)
            .then((results) => {
                setNotes(results)
                setIsLoading(false)
            })
    }
    function onFilterChangeType(type) {
        if (filterBy.type === type) filterBy = { ...filterBy, type: '' }
        else filterBy = { ...filterBy, type }
        setFilterBy(filterBy)
    }

    function onSearch(txt) {
        // console.log(txt)
        if (!txt || !txt.length) filterBy = { ...filterBy, txt: '' }
        else filterBy = { ...filterBy, txt }
        setFilterBy(filterBy)
    }

    return <div className="notes-page">
        <section className="search-notes-box flex-row">
            <input onChange={(ev) => onSearch(ev.target.value)} type="text" className="input-search-note" placeholder="What's on your mind..."></input>
            <nav className="filter-notes">
                <i onClick={() => { onFilterChangeType('text') }} className={iconText}></i>
                <i onClick={() => { onFilterChangeType('img') }}  className={iconImg}></i>
                <i onClick={() => { onFilterChangeType('video') }}className={iconVideo}></i>
                <i onClick={() => { onFilterChangeType('todo') }} className={iconTodo}></i>
            </nav>
        </section>
        {!isLoading && <NoteList notes={notes} filterBy={filterBy} />}
        {isLoading && <div>Loading...</div>}
    </div>

}
