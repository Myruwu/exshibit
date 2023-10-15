import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectDepartment, setSelectDepartment] = useState('');
  const [selectCourse, setSelectCourse] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);

  const validationSchema = Yup.object({
    studentNumber: Yup.string()
    .matches(/^\d{2}-\d{4}-\d{6}$/, 'Invalid student number format (e.g., 00-0000-000000)')
    .required('Student number is required'),
    name: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, 'Name should not contain numbers')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .matches(/@phinmaed\.com$/, 'Email should end with @phinmaed.com')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      studentNumber: '',
      name: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.password2) {
        toast.error('Passwords do not match');
      } else {
        const userData = {
          studentNumber: values.studentNumber,
          department: selectDepartment,
          course: selectCourse,
          name: values.name,
          email: values.email,
          password: values.password,
        };
        dispatch(register(userData));
      }
    },
  });

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, navigate, dispatch]);

  useEffect(() => {
    if (selectDepartment === 'CITE') {
      setAvailableCourses(['BSIT']);
    } else if (selectDepartment === 'CEA') {
      setAvailableCourses(['BSCPE', 'BSCE', 'BSEE']);
    } else {
      setAvailableCourses([]);
    }
  }, [selectDepartment]);

  return (
    <div>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={formik.handleSubmit}>
          {/* Student Number */}
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='studentNumber'
              name='studentNumber'
              value={formik.values.studentNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter your student number (e.g., 00-0000-000000)'
            />
            {formik.touched.studentNumber && formik.errors.studentNumber ? (
              <div className='error'>{formik.errors.studentNumber}</div>
            ) : null}
          </div>
          
          <div className='form-group'>
            <select
              value={selectDepartment}
              onChange={(e) => setSelectDepartment(e.target.value)}
            >
              <option value=''>Filter by Department</option>
              <option value='CITE'>CITE</option>
              <option value='CEA'>CEA</option>
            </select>
          </div>

          <div className='form-group'>
            <select
              value={selectCourse}
              onChange={(e) => setSelectCourse(e.target.value)}
            >
              <option value=''>Filter by Course</option>
              {availableCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter your name'
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='error'>{formik.errors.name}</div>
            ) : null}
          </div>

          {/* Email */}
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter your email'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password */}
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter password'
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='error'>{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Password2 */}
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={formik.values.password2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Confirm password'
            />
            {formik.touched.password2 && formik.errors.password2 ? (
              <div className='error'>{formik.errors.password2}</div>
            ) : null}
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
