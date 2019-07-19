import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'

function SideHeader(props) {

  return(
    <div className='d-flex align-items-center pl-3' style = {{border: "2px solid red", backgroundColor: "#ffcc00", height: "50px"}}> 
      <span className='flex-fill'>MANOR</span> 
      <span className='col-2'><FontAwesomeIcon icon={faBars} /></span>
    </div>
  );
}

export default SideHeader;
