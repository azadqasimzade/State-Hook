import React, { useContext } from 'react'
import NotesContext from '../Context/NotesContext'

const Alert = () => {
    const {alert} = useContext(NotesContext)

  return (
        alert !== null && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show mt-3`} role="alert">
                {alert.msg}
            </div>
        )
  )
}

export default Alert