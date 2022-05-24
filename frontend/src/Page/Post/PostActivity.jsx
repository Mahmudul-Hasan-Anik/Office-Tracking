import { useState } from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import Sidebar from '../../Components/Sidebar'
import axios from 'axios'

const PostActivity = () => {
  const [name,setName] = useState('')
  const [hour, setHour] = useState('')
  const [activity,setActivity] = useState('')


  const handleSubmit = (e)=>{
    e.preventDefault()

    axios.post('http://localhost:8000/post', {
      name,
      hour,
      activity
    })
    .then(()=>{
      setName('')
      setHour('')
      setActivity('')
    })
  }
  return (
    <Row style={{width:'100%'}}>
      <Col lg={2}>
       <Sidebar/>
      </Col>
      <Col>
        <Form className='emplyeeForm ' onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control placeholder="Activity Name " type='text' onChange={(e)=>setName(e.target.value)} value={name}/>
          </Col>
          <Col>
            <Form.Control placeholder="Hour take" type='text' onChange={(e)=>setHour(e.target.value)} value={hour}/>
          </Col>
        </Row>
        <Row className='mt-3 mb-4'>
          <Col>
            <Form.Control placeholder="Activity Details" type='text' as="textarea" rows={7} onChange={(e)=>setActivity(e.target.value)} value={activity}/>
          </Col>
         
        </Row>
        <Button onClick={handleSubmit}>Submit</Button>
        </Form>
      </Col>
  </Row>
  )
}

export default PostActivity