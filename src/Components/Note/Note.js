import React, { useContext } from 'react'
import NotesContext from '../Context/NotesContext'

const Note = ({note}) => {
    const {dispatch} = useContext(NotesContext)
  return (
    <>
        <tr>
            <td style={{width: '40%',textTransform:'capitalize'}}><h5>{note.title}</h5></td>
            <td>{note.body}</td>
            <td style={{width: '3%'}}><button className='btn btn-danger btn-sm' onClick={() => dispatch({type: 'REMOVE_NOTE', title: note.title})}>X</button></td>
        </tr>
    </>
  )
}

export default Note