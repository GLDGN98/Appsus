import { asyncStorageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_DB_KEY = 'notesDB'

const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            title: 'Yo',
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
    sortTodos,
    getEmptyNote,
    getNewTodo,
    getNoteMailURL
}

function get(noteId) {
    return asyncStorageService.get(NOTE_DB_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_DB_KEY, noteId)
}

function save(note) {
    if(note.id) {
        return asyncStorageService.put(NOTE_DB_KEY, note)
    }
    else {
        return asyncStorageService.post(NOTE_DB_KEY, note)
    }
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
function getNoteMailURL(note) {
    let url = ''
    if(note.type === 'note-txt') url = `/mail?compose=on&title=${note.info.title}&body=${note.info.txt}`
    if(note.type === 'note-img') url = `/mail?compose=on&title=${note.info.title}&body=See this image! Url: ${note.info.url}`
    if(note.type === 'note-video') url = `/mail?compose=on&title=Share video note&body=See this video! Url: ${note.info.url}`
    if(note.type === 'note-audio') url = `/mail?compose=on&title=${note.info.title}&body=Hear this audio! Url: ${note.info.url}`
    if(note.type === 'note-todos') {
        url = `/mail?compose=on&title=${note.info.label}&body=`
        url += note.info.todos.map(todo => {
         const todoDone = todo.doneAt ? '' : 'not '   
            return `\nTodo: ${todo.txt} is ${todoDone}done`
        }).join
    }
    return url
        
}
function getEmptyNote(type) {
    
    const noteText  = {
        type: "note-txt",
        isPinned: false,
        info: {
            title: '',
            txt: ''
        },
        style: {
            backgroundColor: "#e7eaf6"
        }
    }

    const noteImg  = {
        type: "note-img",
        isPinned: false,
        info: {
            url: '',
            title: ''
        },
        style: {
            backgroundColor: "#e7eaf6"
        }
    }

    const noteTodos  = {
        type: "note-todos",
        isPinned: false,
        info: {
            label: '',
            todos: [
                { txt: '', doneAt: null}
            ]
        },
        style: {
            backgroundColor: "#e7eaf6"
        }
    }

    const noteVideo  = {
        type: "note-video",
        isPinned: false,
        info: {
            url: ''
        },
        style: {
            backgroundColor: "#e7eaf6"
        }
    }

    const noteAudio  = {
        type: "note-audio",
        isPinned: false,
        info: {
            title: '',
            url: ''
        },
        style: {
            backgroundColor: "#e7eaf6"
        }
    }

    // const noteMap = {
    //     type: "note-map",
    //     isPinned: false,
    //     info: {
    //         lat: 32.128979,
    //         lng: 34.995968
    //     },
    //     style: {
    //         backgroundColor: "#e7eaf6"
    //     }
    // }

    if(type === 'txt') return noteText
    else if(type === 'img') return noteImg
    else if(type === 'todos') return noteTodos
    else if(type === 'video') return noteVideo
    else if(type === 'audio') return noteAudio
    // else if(type === 'map') return noteMap
}

function getNewTodo() {
    return  { txt: '', doneAt: null}
}
