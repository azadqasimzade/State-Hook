import React, { useContext } from 'react'
import NotesContext from '../Context/NotesContext'
import Note from '../Note/Note'

const NoteList = () => {
  const {notes} = useContext(NotesContext)
  return (
    <>
        {
            notes.map((note) =>(
                <Note key={note.title} note={note}/>
            ))
        }
    </>
  )
}

export default NoteList