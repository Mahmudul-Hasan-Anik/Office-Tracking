import axios from 'axios'
import React,{ useState,useContext,useEffect } from 'react'
import {Form,Button} from 'react-bootstrap'
import { toast } from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { Store } from '../../Store'


const Login = () => {
  const navigation = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {state, dispatch} = useContext(Store)

  console.log(state)

  const handleSubmit = async(e)=>{
      e.preventDefault()

      if(!email || !password ){
          toast.error('Please fill all input box')    
      }else if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
              toast.error('Email not Valid')
      }else if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
              toast.error('Password minimum eight characters, at least one letter, one number and one special character')
      }else{
            const data = await axios.post('http://localhost:8000/auth/login',{
              email: email,
              password: password
            }).then((data)=>{

              dispatch({type:'USER_LOGIN', payload: data.data})
              localStorage.setItem('userInformation', JSON.stringify(data.data))
              navigation('/')
              toast.success('Login Successful') 
              
          }).catch((err)=>{
              toast.error('Email or Password Invalid')
          })
      }


  }
  return (
    <div className='From_container'>
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
          </Form.Group>
          
          <Button variant="secondary" type="submit" onClick={handleSubmit}>
              Login
          </Button>

          <p className='from-footer'>Create an account <Link to='/signup'>Registration</Link></p>
      </Form>
  </div>
  )
}

export default Login