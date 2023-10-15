import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMyTickets, reset } from '../features/tickets/ticketSlice'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets)
  const { user } = useSelector(state => state.auth)

  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getMyTickets(user._id))
  }, [dispatch,])

  useEffect(() => {
    if (filterDepartment === 'CITE') {
      setAvailableCourses(['BSIT']);
    } else if (filterDepartment === 'CEA') {
      setAvailableCourses(['BSCPE', 'BSCE', 'BSEE']);
    } else {
      setAvailableCourses([]);
    }
  }, [filterDepartment]);

  const filteredTickets = tickets.filter(ticket => {
    const isDepartmentMatch =
      filterDepartment === '' || ticket.department.toLowerCase() === filterDepartment.toLowerCase();

    const isCourseMatch =
      filterCourse === '' || ticket.course.toLowerCase() === filterCourse.toLowerCase();

      const isSearchMatch =
      searchTerm === '' ||
      Object.values(ticket).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return isDepartmentMatch && isCourseMatch && isSearchMatch;
  });
  const handleSearch = (query) => {
    setSearchTerm(query);
  };
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>My Tickets</h1>
      <div className='search-and-filter'>
        <SearchBar onSearch={handleSearch} />
        <select
          value={filterDepartment}
          onChange={e => setFilterDepartment(e.target.value)}
        >
          <option value=''>Filter by Department</option>
          <option value='CITE'>CITE</option>
          <option value='CEA'>CEA</option>
        </select>
        <select
          value={filterCourse}
          onChange={e => setFilterCourse(e.target.value)}
        >
          <option value=''>Filter by Course</option>
          {availableCourses.map(course => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Student Number</div>
          <div>Department</div>
          <div>Course</div>
          <div>Name</div>
          <div>Date</div>
          <div>Category</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        <div className='ticket-container'>
          {
            filteredTickets.length === 0 ?
            <p>There's no ticket here</p> :
            filteredTickets.map(ticket => (
              <TicketItem key={ticket._id} ticket={ticket} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Tickets
