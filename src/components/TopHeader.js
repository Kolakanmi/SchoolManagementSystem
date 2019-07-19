import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'

function TopHeader(props) {

  return(
    <div className='px-3 d-none d-sm-flex align-items-center' style={{backgroundColor: 'white', height: '50px',}}>
      <span className='flex-fill'>Welcome To Manor School Management System</span>
      <input className='form-control form-control-sm col-5 flex-fill' style={{backgroundColor: 'ghostwhite'}}/>
      <span className='flex-fill'>
        <span className='mx-3'>|</span>
        <span className='mr-3'><FontAwesomeIcon icon={faEnvelope}/></span>
        <span className='mr-3'><FontAwesomeIcon icon={faBell}/></span><span>|</span>
      </span> 
      <div className='d-flex align-items-center flex-wrap ml-auto' style={{margin: '0px'}}>
        <span><FontAwesomeIcon icon={faUser}/></span>
        <div className='' style={{height: '100%', border: '2px solid blue'}}>
          <p style={{margin: '0px', padding: '0px'}}>Kolakanmi</p>
          <p style={{margin: '0px', padding: '0px'}}>Admin</p>
        </div>
        <span><FontAwesomeIcon icon={faAngleDown}/></span>
      </div>

    </div>
  );
}

export default TopHeader;