import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faEdit, faDownload, faSave, faShare} from '@fortawesome/free-solid-svg-icons'
import SectionHeader from '../dashboard/SectionHeader';

function StudentDetails(props) {

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Kolakanmi Apanisile Details'}/>
      <div className='d-flex flex-wrap px-2'>
        <div className='mr-3'>
          <FontAwesomeIcon icon={faImage} size='9x'/>
        </div>
        <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
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
        <div className='d-flex my-2 mx-2'>
            <FontAwesomeIcon icon={faEdit} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faSave} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faDownload} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faShare} className='flex-fill p-1' size='lg' style={{backgroundColor: 'grey'}} />
          </div> 
      </div>

    </div>
  );
}

export default StudentDetails;