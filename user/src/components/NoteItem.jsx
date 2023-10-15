import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
const NoteItem = ({ note, adminId }) => {
  const [adminInfo, setAdminInfo] = useState([])
  useEffect(() => {
    const getAdminName = async () => {
      const adminInfo = await axios.get(`http://localhost:5000/api/admin/me/${adminId}`)
      setAdminInfo(adminInfo.data); 
    }
  
    getAdminName()
  }, [adminInfo, adminId])

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}>
      <h4>
        Note {note.isStaff ? <span>from {adminInfo ? adminInfo.name : "Staff"}</span> : <span>to Staff</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('tr-TR')}
      </div>
    </div>
  )
}

export default NoteItem
