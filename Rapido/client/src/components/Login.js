import React from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form';
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const submit = (userCredObj) => {
        console.log(userCredObj);
        const data = {
            email: userCredObj.email,
            pass: userCredObj.password
        }
        axios.post("http://localhost:1000/clogin", data).then((res) => {
            localStorage.setItem('pos-user', JSON.stringify(res.data));
            navigate("/chome")
        })
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
  return (
      <div>
          <Row>
              <Col sm={12} md={10} className='mx-auto mt-5 mb-4'>
                  <form className='border border-primary  p-4  bg-opacity-50 shadow rounded-3' style={{ color: 'blue' }} onSubmit={handleSubmit(submit)} >
                      <Row>
                          <Col xs={12} md={6}></Col>
                          <Col xs={12} md={6}>
                              <div className='m-5'>
                                  <p className='display-6 text-center'>EXPERIENCE THE ERAVERSE!</p>
                              </div>
                              <hr />
                              {/* email */}
                              <div className="mb-3">
                                  <label htmlFor="email" className='text-center mt-3 mb-1'>Email</label>
                                  <input type="email" style={{ borderRadius: '15px' }} id="email" className="form-control  " {...register("email", { required: true })} />
                                  {/* validation error msg for email */}
                                  {errors.email?.type === 'required' && <p className='text-danger'>* Email required</p>}
                              </div>
                              {/* password */}
                              <div className="mb-3">
                                  <label htmlFor="password" className='mt-3 mb-1 d-block m-auto'>Password</label>
                                  <input type="password" style={{ borderRadius: '15px' }} id="password" className="form-control" {...register("password", { required: true, maxLength: 28, minLength: 4 })} />
                                  {/* validation error msg for password */}
                                  {errors.password?.type === 'required' && <p className='text-danger'>* Password required</p>}
                                  {errors.password?.type === 'minLength' && <p className='text-danger'>* Min length should be 4</p>}
                                  {errors.password?.type === 'maxLength' && <p className='text-danger'>* Max length should be 28</p>}
                              </div>
                              {/* login button */}
                              <div className='mb-1 text-center'>
                                  {/* <button type="submit" className="btn  w-50 mb-1" style={{ borderRadius: '15px', backgroundColor: 'orange', color: '' }}>Login</button> */}
                                  <Button type='submit' variant='outline-primary' size="lg">Login</Button>
                              </div>
                              <div className='row mt-4'>
                                  <div className='col-6 text-end mt-2'>
                                      <p>New User? </p>
                                  </div>
                                  <div className='col-6 text-start'>
                                      {/* <Button href="signup" className='  border-warning border' style={{ borderRadius: '15px', color: 'black' ,backgroundColor:'yellow'}}>SIGNUP</Button> */}
                                      <Button href="signup" variant='outline-primary'>Signup</Button>
                                  </div>

                              </div>
                          </Col>
                      </Row>
                  </form>
              </Col>
          </Row>
      </div>
  )
}

export default Login