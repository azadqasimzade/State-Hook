import React, { useContext } from 'react'
import NotesContext from '../Context/NotesContext'

const Note = ({note}) => {
  const {dispatch} = useContext(NotesContext)
  return (
    <>
        <tr>
            <td style={{width:'40%'}}><h5>{note.title}</h5></td>
            <td>{note.body}</td>
            <td style={{width:'3%'}}><button onClick={() => dispatch({type:'REMOVE_NOTE',title: note.title})} className='btn btn-danger btn-sm'>X</button></td>
        </tr>
    </>
  )
}

export default Note