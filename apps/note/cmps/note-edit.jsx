const { useState, useEffect } = React
const { useNavigate, useParams} = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { eventBusService , showSuccessMsg } from "../services/note.service.js"

export function NoteEdit() {
    const [noteToEdit,setNoteToEdit] = useState(noteService.getEmptyNote())
    

}