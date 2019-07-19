import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import {faUserFriends, faUsers, faUserPlus} from '@fortawesome/free-solid-svg-icons'

/* function layoutBody(){

} */

function StudParTeacSummary(props){

  return(
    <div className='d-flex flex-wrap'>
      <div className='d-flex flex-fill mr-2 p-3' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faUsers} style={{color: '#33cc33'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Students</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}>10,000</strong>
        </div>
      </div>
      <div className='d-flex flex-fill mx-2 p-3' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faUserFriends} style={{color: '#0066ff'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Teachers</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}>2,000</strong>
        </div>
      </div>
      <div className='d-flex flex-fill mx-2 p-3' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faUserPlus} style={{color: '#ffcc00'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Parents</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}>3,000</strong>
        </div>
      </div>
      <div className='d-flex flex-fill ml-2 p-3' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faMoneyBill} style={{color: '#0099ff'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Total Earnings</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}> &#8358; 10,000</strong>
        </div>
      </div>
    </div>
    );
}

export default StudParTeacSummary;