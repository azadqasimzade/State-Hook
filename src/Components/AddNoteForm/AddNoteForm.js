import React, { useContext, useState } from 'react'
import NotesContext from '../Context/NotesContext'


const AddNoteForm = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
  
    const {dispatch, setAlert} = useContext(NotesContext)

    const addNotes = (e) =>{
        e.preventDefault();
    
        if(title !== '' && body !==''){
          dispatch({
            type: 'ADD_NOTE',
            title,
            body
          })
          setTitle('')
          setBody('')
        }else{
          setAlert(true)
    
          setTimeout(() => {
            setAlert(false)
          }, 3000);
        }
          
    }
    
  return (
    <>
        <form onSubmit={addNotes}>
            <div className="form-group">
            <label htmlFor="title"><h6>Title:</h6></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className='form-control'/>
            <label htmlFor="desc" className='mt-3'><h6>Description:</h6></label>
            <textarea id="desc" value={body} onChange={(e) =>setBody(e.target.value)} rows="4" className='form-control'></textarea>
            <button className='btn btn-primary w-100 mt-3'>Add Note</button>
            </div>
        </form>
    </>
  )
}

export default AddNoteForm