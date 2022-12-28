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
                { txt: "Coding power", doneAt: 187111111 }
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
    getDefaultFilter
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

function query() {
    return asyncStorageService.query(NOTE_DB_KEY)
        .then(notes => {
            return notes
        })
}

function getDefaultFilter() {
    return { txt: '', type: '' }
}

function _createNotes() {
    const getNotes = utilService.loadFromStorage(NOTE_DB_KEY)
    if (getNotes !== undefined || !getNotes.length) {
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


