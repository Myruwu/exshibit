import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const NewTicket = () => {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.tickets
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      alert(message);
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createTicket({name, email, product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the for below</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <select
              name='category'
              id='category'
              value={product}
              onChange={e => setProduct(e.target.value)}>
              <option value='category'>Please choose a category</option>
              <option value='Tuition Fee'>Tuition Fee</option>
              <option value='Exam Permit'>Exam Permit</option>
              <option value='Scholarship'>Scholarship</option>
              <option value='Class Schedule'>Class Schedule</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}></textarea>
          </div>

          <div className='form-group'>
            <button className='btn btn-block' onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
