import React, { useEffect, useReducer, useState } from 'react'
import AddNoteForm from '../AddNoteForm/AddNoteForm'
import NotesReducer from '../Reducer/Reducer'
import NotesContext from '../Context/NotesContext'
import NoteList from '../NoteList/NoteList'
import Alert from '../Alert/Alert'

const NoteApp = () => {
    const [notes, dispatch] = useReducer(NotesReducer, [])
    const [alert, setAlert] = useState(null)

    useEffect(() =>{
        const notesData = JSON.parse(localStorage.getItem('Notes'))

        if(notesData){
            dispatch({
                type: 'POPULATE_NOTES',
                notes: notesData
            })
        }
    }, [])

    useEffect(() =>{
        localStorage.setItem('Notes',JSON.stringify(notes))
    }, [notes])

    const showAlert = (msg,type) =>{
        setAlert({msg,type})

        setTimeout(() => {
            setAlert(null)
        }, 2500);
    }

  return (
    <>
        <NotesContext.Provider value={{notes, dispatch, showAlert, alert}}>
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
                    <div className="card-body">
                        
                        <Alert/>
                        <AddNoteForm/>
                    </div>
                </div>
            </div>
        </NotesContext.Provider>
    </>
  )
}

export default NoteApp