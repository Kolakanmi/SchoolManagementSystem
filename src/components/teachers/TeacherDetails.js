import React, {useContext} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';


function TeacherDetails(props) {

  const [state] = useContext(AppContext);

  const teacherId = props.match.params.id;

  const teacher = state.teachers.find(teach => teach.employmentNumber === teacherId);

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'About ' + teacher.firstName + " " + teacher.lastName}/>
      <div className='d-flex flex-wrap px-2'>
        <div className='mr-3 mb-3'>
          <img className='rounded' alt="Teacher" style={{width: '100px', height: '100px'}} src={'/' + teacher.picture}/>
        </div>
        <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
          <div className='my-sm-2' style={{padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.firstName + ' ' + teacher.lastName}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.gender}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Date of Birth:</p> <p className='col-8 p-0 px-sm-2'><strong>{new Date(teacher.dateOfBirth).toDateString()}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Religion:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.religion}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>E-mail:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.email}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Employment Date:</p> <p className='col-8 p-0 px-sm-2'><strong>{new Date(teacher.employmentDate).toDateString()}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Class:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.class}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Section:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.section}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Home Address:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.address}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Subjects Taking:</p> <p className='col-8 p-0 px-sm-2'><strong>...</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Mobile Number No:</p> <p className='col-8 p-0 px-sm-2'><strong>{teacher.mobileNumber}</strong></p></div>          
          </div>
        </div> 
       {/* <div className='d-flex my-2 mx-2'>
            <FontAwesomeIcon icon={faEdit} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faSave} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faDownload} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faShare} className='flex-fill p-1' size='lg' style={{backgroundColor: 'grey'}} />
          </div> */}
      </div>

    </div>
  );
}

export default TeacherDetails;