import { useState,useEffect,useContext } from 'react'
import {Row,Col,Form,Button,Table,Container,Modal} from 'react-bootstrap'
import Sidebar from '../../Components/Sidebar'
import axios from 'axios'
import { Store } from '../../Store'

const Today = () => {
 
  const {state} = useContext(Store)
  const {userInformation} = state

  const [batch,setBatch] = useState('')
  const [time, setTime] = useState('')
  const [room,setRoom] = useState('')
  const [todayID,setTodayID] = useState('')
  const [items, setItems] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const handleSubmit = (e)=>{
    e.preventDefault()

    axios.post('http://localhost:8000/api/today', {
      batch,
      time,
      room,
      user: userInformation
    })
    .then(()=>{
      setBatch('')
      setTime('')
      setRoom('')
    })
  }

  useEffect(()=>{
    async function fatchData(){
      const {data} = await axios.get(`/api/today/user/${userInformation._id}`)
      setItems(data)
    }
    fatchData()
  },[])

  const handleDelete = (id)=>{
    axios.post('/api/today/delete',{
      id
    })
  }

  const handleEdit = async(id)=>{
     const {data} = await axios.get(`/api/today/${id}`)
     setBatch(data.batch)
     setTime(data.time)
     setRoom(data.room)
     setTodayID(data._id)
     setShow(true)
  }

  const handleEditSubmit = ()=>{
    axios.put('/api/today/edit',{
      id: todayID,
      batch: batch,
      time: time,
      room: room
    }).then(()=>{
      setShow(false)
      setBatch('')
      setTime('')
      setRoom('')
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
            <Form.Control placeholder="Batch" type='text' onChange={(e)=>setBatch(e.target.value)} value={batch}/>
          </Col>
          <Col>
            <Form.Control placeholder="Time" type='text' onChange={(e)=>setTime(e.target.value)} value={time}/>
          </Col>
        </Row>
        <Row className='mt-3 mb-4'>
          <Col>
            <Form.Control placeholder="Room" type='text' onChange={(e)=>setRoom(e.target.value)} value={room}/>
          </Col>
         
        </Row>
        <Button onClick={handleSubmit}>Submit</Button>
        </Form>


    <Container>
    <Table hover size='sm' className='myTable'>
      <thead>
        <tr>
          <th>BATCH NAME</th>
          <th>TIME</th>
          <th>ROOM</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {items.map((item)=>(

      <tr key={item._id}>
        <td>{item.batch}</td>
        <td>{item.time}</td>
        <td>{item.room}</td>
        <td>
           <Button><i class="fa-solid fa-pen-to-square" onClick={()=>handleEdit(item._id)}></i></Button>{' '}
           <Button variant='danger' onClick={()=>handleDelete(item._id)}><i class="fa-solid fa-trash-can"></i></Button>
         </td>
      </tr>
      ))}
        
      </tbody>
    </Table>
    </Container>
       
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
          <Row>
            <Col>
              <Form.Control placeholder="Batch" type='text' onChange={(e)=>setBatch(e.target.value)} value={batch}/>
            </Col>
            <Col>
              <Form.Control placeholder="Time" type='text' onChange={(e)=>setTime(e.target.value)} value={time}/>
            </Col>
          </Row>
          <Row className='mt-3 mb-4'>
            <Col>
              <Form.Control placeholder="Room" type='text' onChange={(e)=>setRoom(e.target.value)} value={room}/>
            </Col>
          
          </Row>
          <Button onClick={handleEditSubmit} style={{width:'100%'}}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Row>
  )
}

export default Today