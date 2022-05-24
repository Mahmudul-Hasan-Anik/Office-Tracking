import { useState,useEffect,useContext } from 'react'
import {Row,Col,Form,Button,Table,Container,Modal} from 'react-bootstrap'
import Sidebar from '../../Components/Sidebar'
import axios from 'axios'
import { Store } from '../../Store'

const EmplyeeList = () => {
  const [name,setName] = useState('')
  const [office, setOffice] = useState('')
  const [designation,setDesignation] = useState('')
  const [dayoff,setDayoff] = useState('')
  const [userID,setUserID] = useState('')
  const [items, setItems] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const {state} = useContext(Store)
  const {userInformation} = state


  const handleSubmit = (e)=>{
    e.preventDefault()

    axios.post('http://localhost:8000/emplyee', {
      name,
      office,
      designation,
      dayoff,
      user: userInformation
    })
    .then(()=>{
      setName('')
      setOffice('')
      setDesignation('')
      setDayoff('')
    })
  }


  useEffect(()=>{
    async function fetchData() {
      const {data} = await axios.get(`/emplyee/user/${userInformation._id}`)
      setItems(data)
      
    }
    fetchData()
  },[items])

 


  const handleDelete = (id)=>{
    axios.post(`http://localhost:8000/emplyee/delete`,{
      id
    })
  }

  const handleEdit = async(id)=>{
    const {data} = await axios.get(`http://localhost:8000/emplyee/${id}`)
    
    setUserID(data._id)
    setName(data.name)
    setOffice(data.office)
    setDesignation(data.designation)
    setDayoff(data.dayoff)
    setShow(true)

  }

  const handleEditSubmit = (e)=>{
    e.preventDefault()

    axios.put('http://localhost:8000/emplyee/edit',{
      id: userID,
      name: name,
      office: office,
      designation: designation,
      dayoff: dayoff
    }).then(()=>{
       setShow(false)
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
            <Form.Control placeholder="name" type='text' onChange={(e)=>setName(e.target.value)} />
          </Col>
          <Col>
            <Form.Control placeholder="Office Time" type='text' onChange={(e)=>setOffice(e.target.value)} />
          </Col>
        </Row>
        <Row className='mt-3 mb-4'>
          <Col>
            <Form.Control placeholder="Designation" type='text' onChange={(e)=>setDesignation(e.target.value)} />
          </Col>
          <Col>
            <Form.Control placeholder="Day Off" type='text' onChange={(e)=>setDayoff(e.target.value)} />
          </Col>
        </Row>
        <Button onClick={handleSubmit}>Submit</Button>
        </Form>


    <Container>
    <Table hover size='sm' className='myTable'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>DESIGNATION</th>
          <th>OFFICE TIME</th>
          <th>DAY OFF</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
      {items.map((item,index)=>(
         <tr key={item._id}>
         <td>{index + 1}</td>
         <td>{item.name}</td>
         <td>{item.designation}</td>
         <td>{item.office}</td>
         <td>{item.dayoff}</td>
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
          <Form>
              <Row>
                <Col>
                  <Form.Control placeholder="name" type='text' onChange={(e)=>setName(e.target.value)} value={name}/>
                </Col>
                <Col>
                  <Form.Control placeholder="Office Time" type='text' onChange={(e)=>setOffice(e.target.value)} value={office}/>
                </Col>
              </Row>
              <Row className='mt-3 mb-4'>
                <Col>
                  <Form.Control placeholder="Designation" type='text' onChange={(e)=>setDesignation(e.target.value)} value={designation}/>
                </Col>
                <Col>
                  <Form.Control placeholder="Day Off" type='text' onChange={(e)=>setDayoff(e.target.value)} value={dayoff}/>
                </Col>
              </Row>
              <Button onClick={handleEditSubmit} style={{width:'100%'}}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Row>

    
  )
}

export default EmplyeeList