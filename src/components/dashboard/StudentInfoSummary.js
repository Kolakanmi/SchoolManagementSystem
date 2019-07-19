import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faImage, faShare, faEdit, faSave, faDownload} from '@fortawesome/free-solid-svg-icons'
//import {faImage} from '@fortawesome/free-regular-svg-icons'


function StudentInfoSummary(props) {

  return(
    <div className='flex-fill px-1 px-sm-3 my-sm-3 mr-sm-3 shadow' style={{backgroundColor: 'white', border: '2px solid blue'}}>
      <div className='d-flex'>
        <strong>My Information</strong>
        <span className='ml-auto'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div className='d-flex flex-wrap'>
        <div className='my-sm-2' style={{border: '2px solid red', padding: '0px'}}>
          <FontAwesomeIcon className='flex-fill' icon={faImage} size='9x' style={{border: '2px solid red'}}/>
          <div className='d-flex my-2'>
            <FontAwesomeIcon icon={faEdit} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faSave} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faDownload} className='flex-fill mr-2' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faShare} className='flex-fill' style={{backgroundColor: 'grey'}} />
          </div>
        </div>
        <div className='my-sm-2' style={{border: '2px solid green', padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 p-0 px-sm-2'><strong>Kolakanmi Apanisile</strong></p></div>
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 p-0 px-sm-2'><strong>Male</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Father's Name:</p> <p className='col-8 p-0 px-sm-2'><strong>Kolawole Oladotun Apanisile</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Mother's Name:</p> <p className='col-8 p-0 px-sm-2'><strong>Adesua Felicia Apanisile</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Date of Birth:</p> <p className='col-8 p-0 px-sm-2'><strong>09/07/1997</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Religion:</p> <p className='col-8 p-0 px-sm-2'><strong>Christianity</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Father's Occupation:</p> <p className='col-8 p-0 px-sm-2'><strong>Teacher</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>E-mail:</p> <p className='col-8 p-0 px-sm-2'><strong>apanisilekolakanmi@gmail.com</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission Date:</p> <p className='col-8 p-0 px-sm-2'><strong>01/01/2012</strong></p></div> 
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Class:</p> <p className='col-8 p-0 px-sm-2'><strong>Finished</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Section:</p> <p className='col-8 p-0 px-sm-2'><strong>A</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Home Address:</p> <p className='col-8 p-0 px-sm-2'><strong>4, Smith Lanre Street, Abule, Ijoko-Lemode</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Father's Phone No:</p> <p className='col-8 p-0 px-sm-2'><strong>08083330801</strong></p></div>          
          <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Mother's Phone No:</p> <p className='col-8 p-0 px-sm-2'><strong>08023840960</strong></p></div>          


        </div>
      </div>
    </div>
  );
}

export default StudentInfoSummary;