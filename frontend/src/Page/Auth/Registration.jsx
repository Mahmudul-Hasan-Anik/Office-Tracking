import axios from 'axios'
import React,{ useState ,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import { toast } from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'

const Registration = () => {
    const navigation = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confrom, setConfrom] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(!name || !email || !password || !confrom){
            toast.error('Please fill all input box')
            
        }else if(!name.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)){
            toast.error('Name must be start captial word ')
           
        }else if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                toast.error('Email not Valid')
        }else if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
                toast.error('Password minimum eight characters, at least one letter, one number and one special character')
        }else if(password !== confrom){
                toast.error('Password Not Matched')
        }else{
            axios.post('http://localhost:8000/auth',{
                name: name,
                email: email,
                password: password
            }).then(()=>{
                setName('')
                setEmail('')
                setPassword('')
                setConfrom('')
                toast.success('Registration Successful')
                navigation('/login')
            }).catch((e)=>{
                toast.error('Registration Fail')
            })
        }

    }


  return (
    <div className='From_container'>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confrom Password</Form.Label>
                <Form.Control type="password" placeholder="Retype Password" onChange={(e)=>setConfrom(e.target.value)} value={confrom}/>
            </Form.Group>
            
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
                Registration
            </Button>
            <p className='from-footer'>Already Have an account <Link to='/login'>Login</Link></p>
        </Form>
    </div>
  )
}

export default Registration