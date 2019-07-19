import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faImage, faShare, faEdit, faSave, faDownload} from '@fortawesome/free-solid-svg-icons'
import StudFeesExamDoc from './StudFeesExamDoc';
import NoticeBoard from './NoticeBoard';
import ParentAllExpenses from './ParentAllExpenses'

function SingleChild(props){

  return(
    <div className='flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%'}}>
      <div className='d-flex'>
        <strong>My Children_01</strong>
        <span className='ml-auto'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div className='d-flex flex-wrap flex-fill'>
        <div className='my-sm-2' style={{border: '2px solid red', padding: '0px'}}>
          <FontAwesomeIcon className='flex-fill' icon={faImage} size='9x' style={{border: '2px solid red'}}/>
          <div className='d-flex my-2'>
            <FontAwesomeIcon icon={faEdit} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faSave} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faDownload} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faShare} className='flex-fill' style={{backgroundColor: 'grey'}} />
          </div>
        </div>
        <div className='my-sm-2 flex-fill' style={{border: '2px solid green', padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 pl-2 px-sm-2'><strong>Kolakanmi Apanisile</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 pl-2 px-sm-2'><strong>Male</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Class:</p> <p className='col-8 pl-2 px-sm-2'><strong>Finished</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Section:</p> <p className='col-8 pl-2 px-sm-2'><strong>A</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission Date:</p> <p className='col-8 pl-2 px-sm-2'><strong>09/07/1997</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Due Fees:</p> <p className='col-8 pl-2 px-sm-2'><strong>15,000</strong></p></div>          
        </div>
      </div>

    </div>
  );
}

function ParentsDashboard(props){

  return(
    <div className='d-flex flex-wrap-reverse'>
      <div className='mr-3'>
        <SingleChild/>
      </div>
      <div className='d-flex flex-column flex-fill my-3' style={{display: 'flex', overflowX: 'auto'}}>
        <StudFeesExamDoc/>
        <NoticeBoard/>
        <ParentAllExpenses/>
      </div>
    </div>
  );
}

export default ParentsDashboard;