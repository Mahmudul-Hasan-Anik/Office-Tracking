import React from 'react'
import { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { Store } from '../Store';

const Sidebar = () => {
  const {state} = useContext(Store)
  const {userInformation} = state

  return (
    <div className='sideBar'>
      <img src="./image/men.png"/>

    <Nav className="flex-column mt-5" >
      {userInformation? 
      <div className='user_show'>
        <h4>{userInformation.name}</h4>
        <p>{userInformation.email}</p>
      </div>
      :
      ''}

        <Nav.Link>
          <Link  to='/'>Emplyee List</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/today'>Today Class</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/post'>Post Activity</Link>
        </Nav.Link>
        <Nav.Link >
          <Link to='/details'>Activity Details</Link>
        </Nav.Link>
        <Nav.Link >
          <Link to='/apply'>Apply for Leave</Link>
        </Nav.Link>
        <Nav.Link >
          <Link to='/late'>Late List</Link>
        </Nav.Link>
    </Nav>
    </div>
  )
}

export default Sidebar