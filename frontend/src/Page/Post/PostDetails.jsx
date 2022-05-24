import { useState,useEffect } from 'react'
import {Row,Col,Modal,Button,Table,Container,Form} from 'react-bootstrap'
import Sidebar from '../../Components/Sidebar'
import axios from 'axios'

const PostDetails = () => {
  const [items, setItems] = useState([])
  const [name,setName] = useState('')
  const [hour, setHour] = useState('')
  const [activity,setActivity] = useState('')
  const [postID,setPostID] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  useEffect(()=>{
      async function fatchData(){
          const {data} = await axios.get('/post')
          setItems(data)
      }
      fatchData()
  },[])

  const handleDelete = (id)=>{
    axios.post('/post/delete',{
      id
    })
  }

  const handleEdit = async(id)=>{
    const {data} = await axios.get(`/post/${id}`)
    setPostID(data._id)
    setName(data.name)
    setHour(data.hour)
    setActivity(data.activity)
    setShow(true)
  }

  const handleEditSubmit = (e)=>{
    e.preventDefault()

    axios.put('/post/edit', {
      id: postID,
      name: name,
      hour: hour,
      activity: activity
    }).then(()=>{
      setName('')
      setHour('')
      setActivity('')
      setShow(false)
    })

  }

  return (
    <Row style={{width:'100%'}}>
      <Col lg={2}>
       <Sidebar/>
      </Col>
      <Col>


    <Container>
    <Table hover size='sm' className='myTable mt-5'>
      <thead>
        <tr>
          <th>NAME</th>
          <th>TIME</th>
          <th>DETAILS</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {items.map((item)=>(
          <tr>
          <td>{item.name}</td>
          <td>{item.hour}</td>
          <td>{item.activity}</td>
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
        <Button onClick={handleEditSubmit} style={{width:'100%'}}>Submit</Button>
        </Form>
        </Modal.Body>
      </Modal>
    </Row>
  )
}

export default PostDetails