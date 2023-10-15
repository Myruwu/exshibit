import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'


const TicketItem = ({ ticket }) => {
  const { user } = useSelector(state => state.auth)

  const handleAssigned = async () => {
    try {
      await axios.post(`http://localhost:5000/api/admin/assign/${ticket._id}`, {
        admin: user._id,
      });

      window.location.reload();
    } catch (error) {
    }
  };



  return (
    <div className='ticket'>
      <div>{ticket.studentNumber}</div>
      <div>{ticket.department}</div>
      <div>{ticket.course}</div>
      <div>{ticket.name}</div>
      <div>{new Date(ticket.createdAt).toLocaleString('tr-TR')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <div className='btn-container'>
        {ticket.admin === user._id ? 
          <Link to={`/ticket/${ticket._id}`} className='btn btn-sm'>
            View
          </Link> : null
        }
        {ticket.admin === user._id ? (
          <button onClick={handleAssigned} className='btn btn-sm'>
            {ticket.admin ? "Unassigned" : "Assigned"}
          </button>
        ) : (
          <button onClick={ticket.admin ? () => alert("This ticket is already assigned to someone else") : handleAssigned} className='btn btn-sm'>
            {ticket.admin ? "Assigned to Someone Else" : "Assigned"}
          </button>
        )}
      </div>
    </div>
  )
}

export default TicketItem
