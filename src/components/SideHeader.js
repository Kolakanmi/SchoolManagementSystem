import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'

function SideHeader({barOpen, setBarOpen}) {

  return(
    <div className='d-flex align-items-center pl-3' style = {{backgroundColor: "#ffcc00", height: "50px"}}>
      <span className='flex-fill'>ELIS</span>
      <span className='col-2'><FontAwesomeIcon icon={faBars} onClick={() => {setBarOpen(!barOpen)}}/></span>
    </div>
  );
}

export default SideHeader;
