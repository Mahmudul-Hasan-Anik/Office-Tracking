import React from 'react'
import { useContext } from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from '../Store'
import {Dropdown} from 'react-bootstrap'

const Header = () => {
  const {state, dispatch} = useContext(Store)

  const handleLogout = async()=>{
    await dispatch({type:'USER_LOGOUT'})
    localStorage.removeItem('userInformation')
  }


  return (
    <Navbar expand="lg" className='Nav flex-column' variant='dark'>
    <Container>
        <Navbar.Brand>Tracking</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
            <Nav.Link >
              <Link to='/'>Home</Link>
            </Nav.Link>
            <Nav.Link >
              {state.userInformation? 
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" >
                   {state.userInformation.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                : 
                <Link to='/signup'>SIGN UP</Link>
              }
              
            </Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header