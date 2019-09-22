import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes} from '@fortawesome/free-solid-svg-icons'

function SectionHeader(props){

  let sTitle = props.sTitle;
  let toggleCollapse = props.toggleCollapse;
  let toggleClose = props.toggleClose;
  return(
    <div className='flex-fill px-2 my-3' style={{backgroundColor: 'white', width: '100%'}}>
      <div className='d-flex'>
        <strong>{sTitle}</strong>
        <span className='ml-auto'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={toggleCollapse} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={toggleClose} />
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>

    </div>
  );
}

export default SectionHeader;