import React, { useReducer, useState, useEffect } from 'react'
import notesReduces from '../Reducer/Reducer'
import NoteList from '../NoteList/NoteList'
import AddNoteForm from '../AddNoteForm/AddNoteForm'
import NotesContext from '../Context/NotesContext'

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReduces, [])
  const [alert, setAlert] = useState(false)

  useEffect(() =>{
    const notesData = JSON.parse(localStorage.getItem('Notes'));

    if(notesData){
      dispatch({
        type: 'POPULATE_NOTES',
        notes : notesData
      })
    }
  } ,[])

  useEffect(() =>{
    localStorage.setItem('Notes',JSON.stringify(notes))
  }, [notes])
  
  return (
    <>
    <NotesContext.Provider value={{notes, dispatch, setAlert}}>
      <div className="container p-5">
        <div className="card">
          <div className="card-header"><h3>Notes</h3></div>
          {
            notes && (
              <table className='table table-striped table-hover mb-0'>
                <tbody>
                  {
                    <NoteList/>
                  }
                </tbody>
            </table>
            )
          }
        </div>

        <div className="card mt-4">
          <div className="card-header"><h5>Add a New Note</h5></div>
          {
            alert && (
              <>  
                <div className="alert alert-danger alert-dismissible fade show mt-3 mb-0 ms-3 me-3" role="alert">
                    Add a new Title and Description!
                </div>
              </>
            )
          }
          <div className="card-body">
            <AddNoteForm />
          </div>
        </div>
      </div>
    </NotesContext.Provider>
    </>
  )
}

export default NoteApp