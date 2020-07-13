import React, {useContext} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';


function StudentDetails(props) {

  const [state, dispatch] = useContext(AppContext);

  const studentId = props.match.params.id;

  const student = state.students.find(stud => stud.admissionNumber === studentId);
  


  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={student.firstName + ' ' + student.lastName + ' Details'}/>
      <div className='d-flex flex-wrap px-2'>
        <div className='mr-3'>
          <img style={{width: '100px', height: '100px'}} src={'/' + student.picture} alt='student'/>
        </div>
        <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
          <div className='my-sm-2' style={{padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.firstName + ' ' + student.lastName} </strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission No:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.admissionNumber} </strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.gender} </strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Father's Name:</p> <p className='col-8 p-0 px-sm-2'><strong>{(student.parents[0] !== undefined) ? student.parents[0].firstName + ' ' + student.lastName : ''} </strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Mother's Name:</p> <p className='col-8 p-0 px-sm-2'><strong>{(student.parents[1] !== undefined) ? student.parents[1].firstName + ' ' + student.lastName : ''} </strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Date of Birth:</p> <p className='col-8 p-0 px-sm-2'><strong>{new Date(student.dateOfBirth).toDateString()}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Religion:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.religion}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Father's Occupation:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.parents[0].occupation}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>E-mail:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.parents[0].email}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Admission Date:</p> <p className='col-8 p-0 px-sm-2'><strong>{new Date(student.admissionDate).toDateString()}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Class:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.class}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Section:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.section}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Home Address:</p> <p className='col-8 p-0 px-sm-2'><strong>{student.address}</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Father's Phone No:</p> <p className='col-8 p-0 px-sm-2'><strong>{(student.parents[0] !== undefined) ? student.parents[0].mobileNumber : ''}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Mother's Phone No:</p> <p className='col-8 p-0 px-sm-2'><strong>{(student.parents[1] !== undefined) ? student.parents[1].mobileNumber : ''}</strong></p></div>
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

export default StudentDetails;