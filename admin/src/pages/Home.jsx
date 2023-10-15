import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { useSelector  } from 'react-redux'

const Home = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <>
      <section className='heading'>
        <p>{user ? `Hello there, ${user.name}! Welcome back` : "Hi There! You need to login before you access the functionality"}</p>
        <h1>Ready to handle tickets?</h1>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Assign New Ticket
      </Link>

      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}

export default Home
