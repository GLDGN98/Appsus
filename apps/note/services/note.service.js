import { asyncStorageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_DB_KEY = 'notesDB'

const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://d.newsweek.com/en/full/2120466/triptych-photo-donald-trump.webp?w=466&h=311&l=50&t=28&f=f4760c7c9955ac99c7aa2bb75ef1d1b3",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 },
                { txt: "Go home", doneAt: null },
                { txt: "Go work", doneAt: 187111555 }
            ]
        }
    }
]

_createNotes()


export const noteService = {
    get,
    remove,
    save,
    query,
    getDefaultFilter,
    sortTodos
}

function get(noteId) {
    return asyncStorageService.get(NOTE_DB_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_DB_KEY, noteId)
}

function save(note) {
    if (note.id) return asyncStorageService.put(NOTE_DB_KEY, note)
    else return asyncStorageService.post(NOTE_DB_KEY, note)
}

function query(filterBy = getDefaultFilter()) {
    return asyncStorageService.query(NOTE_DB_KEY)
        .then(notes => {
            let getNotes
            if (filterBy.type === '' || !filterBy.type) {
                if (filterBy.txt) {
                    getNotes = _filterByType(notes, 'text', filterBy.txt)
                    getNotes = [...getNotes, ..._filterByType(notes, 'img', filterBy.txt)]
                    getNotes = [...getNotes, ..._filterByType(notes, 'todo', filterBy.txt)]
                }
                else getNotes = notes
            }
            else getNotes = _filterByType(notes, filterBy.type, filterBy.txt)
            return (getNotes) ? sortPinned(getNotes) : []
        })
}

function _filterByType(allNotes, type, txt) {
    let myNotes
    if(!txt) txt = ''
    const regex = new RegExp(txt, 'i')
    if (type === 'todo') {
        myNotes = allNotes.filter(note => note.type === 'note-todos')
        return myNotes.filter(note => regex.test(note.info.label))
    }
    else if (type === 'text') {
        myNotes = allNotes.filter(note => note.type === 'note-txt')
        return myNotes.filter(note => regex.test(note.info.txt))
    }
    else if (type === 'img') {
        myNotes = allNotes.filter(note => note.type === 'note-img')
        return myNotes.filter(note => regex.test(note.info.title))
    }
    else if (type === 'video') {
        myNotes = allNotes.filter(note => note.type === 'note-video')
        return myNotes.filter(note => regex.test(note.info.url))
    }
}


function sortTodos(note) {
    if (!note.info.todos) return null
    const done = note.info.todos.filter(todo => todo.doneAt)
    const unDone = note.info.todos.filter(todo => !todo.doneAt)
    unDone.push(...done)
    return unDone
}


function sortPinned(notes) {
    if (!notes) return []
    const pinned = notes.filter(note => note.isPinned)
    const unPinned = notes.filter(note => !note.isPinned)
    pinned.push(...unPinned)
    return pinned
}

function getDefaultFilter() {
    return { type: '', txt: '' }
}

function _createNotes() {
    const getNotes = utilService.loadFromStorage(NOTE_DB_KEY)
    if (!getNotes || !getNotes.length) {
        utilService.saveToStorage(NOTE_DB_KEY, notes)
    }
}

function getEmptyNote() {
    return {
        id: "n101",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        }
    }
}


