import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import {faUserFriends, faUsers, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import {AppContext} from "../../contexts/AppContext";

/* function layoutBody(){

} */

function StudParTeacSummary(props){
    const [state, dispatch] = useContext(AppContext);
    const {students, parents, teachers} = state;
  return(
    <div className='d-flex flex-wrap'>
      <div className='d-flex flex-fill mx-1 p-3 mb-1' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faUsers} style={{color: '#33cc33'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Students</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}>{students.length}</strong>
        </div>
      </div>
      <div className='d-flex flex-fill mx-1 p-3 mb-1' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faUserFriends} style={{color: '#0066ff'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Teachers</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}>{teachers.length}</strong>
        </div>
      </div>
      <div className='d-flex flex-fill mx-1 p-3 mb-1' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faUserPlus} style={{color: '#ffcc00'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Parents</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}>{parents.length}</strong>
        </div>
      </div>
      <div className='d-flex flex-fill mx-1 p-3 mb-1' style={{height: '', backgroundColor: 'white'}}>
        <div className='d-flex flex-column align-items-center flex-fill' style={{padding:'0px'}}>
          <span className='d-flex justify-content-center' style={{}}><FontAwesomeIcon icon={faMoneyBill} style={{color: '#0099ff'}} size='lg'/></span>
          <p style={{margin: '0px'}}><small>Earnings</small></p>
        
        </div>
        <div className='d-flex align-self-center flex-fill justify-content-center' style={{}}>
          <strong style={{fontSize: '1.5rem'}}>10,000</strong>
        </div>
      </div>
    </div>
    );
}

export default StudParTeacSummary;