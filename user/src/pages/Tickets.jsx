import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>My Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Category</div>
          <div>Status</div>
          <div>View</div>
        </div>
        
        <div className='ticket-container'>
        {
          tickets.length === 0 ?
          <p>There's no ticket here</p> :
          tickets.map(ticket => (
            <TicketItem key={ticket._id} ticket={ticket}/>
          ))
        }
        </div>
      </div>
    </>
  )
}

export default Tickets
