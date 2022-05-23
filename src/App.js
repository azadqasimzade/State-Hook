import React, {useEffect, useReducer, useState} from 'react'

const notesReduces = (state, action) =>{
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes
    case 'ADD_NOTE':
      return [
        ...state,
        {title: action.title, body: action.body}
      ]
    case 'REMOVE_NOTE':
      return state.filter((note) => note.title !== action.title)
    default:
      return state
  }
}

const App = () => {
  const [notes, dispatch] = useReducer(notesReduces, [])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
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

  const removeNote =(title) =>{
    dispatch({
      type: 'REMOVE_NOTE',
      title
    })
  }

  return (
    <>
      <div className="container p-5">
        <div className="card">
          <div className="card-header"><h3>Notes</h3></div>
          {
            notes && (
              <table className='table table-striped table-hover mb-0'>
                <tbody>
                  {
                    notes.map((note) =>(
                      <tr key={note.title}>
                        <td style={{width:'40%'}}><h5>{note.title}</h5></td>
                        <td>{note.body}</td>
                        <td style={{width:'3%'}}><button onClick={() => removeNote(note.title)} className='btn btn-danger btn-sm'>X</button></td>
                      </tr>
                    ))
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
                    Add new Title and Description!
                </div>
              </>
            )
          }
          <div className="card-body">
            <form onSubmit={addNotes}>
              <div className="form-group">
                <label htmlFor="title"><h6>Title:</h6></label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className='form-control'/>
                <label htmlFor="desc" className='mt-3'><h6>Description:</h6></label>
                <textarea id="desc" value={body} onChange={(e) =>setBody(e.target.value)} rows="4" className='form-control'></textarea>
                <button className='btn btn-primary w-100 mt-3'>Add Note</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App