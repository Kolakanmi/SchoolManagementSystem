import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faEye, faEdit, faDumpster} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';


function AllStudentTable({students, dispatch}){
  
  async function deleteStudent(studId){
    await axios.get('http://localhost:8080/delete-student/'+studId)
        .then(result => {
          if (result.status === 200) {
            let action = {type: 'DELETE_STUDENT', payload: studId};
            dispatch(action);
          }
        })
  }
  
  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Admn No</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Parent's Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Parent's Mobile</th>
            <th>Parent's Email</th>
            <th>Admn Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{minHeight: '600px !important'}}>
          {students.sort((a,b) => {return a.lastName - b.lastName}).map(student => {return <tr key={student.admissionNumber}>
            
            
            <td>{student.admissionNumber}</td>
            <td><img src={'http://localhost:8080/'+student.picture}/></td>
            <td>{student.firstName + ' ' + student.lastName}</td>
            <td>{student.gender}</td>
            <td>{student.parents[0].firstName || student.parents[1].firstName}</td>
            <td>{student.class}</td>
            <td>{student.section} </td>
            <td>{student.address}</td>
            <td>{new Date(student.dateOfBirth).toDateString()}</td>
            <td>{student.parents[0].mobileNumber || student.parents[1].mobileNumber}</td>
            <td>{student.parents[0].email || student.parents[1].email}</td>
            <td>{new Date(student.admissionDate).toDateString()} </td>
            <td className='flex-fill' style={{minWidth: '80px'}}>
              <Link to={'/students/student-details/'+student.admissionNumber}><FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/></Link>
              <Link to={'/students/edit-student/'+student.admissionNumber}> <FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}/></Link>
              <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}} onClick={() => deleteStudent(student.admissionNumber)}/>
            </td>
          </tr>})}
        </tbody>
      </table>
    </div>
  );
}

function AllStudents(props){

  const [state, dispatch] = useContext(AppContext);
  const {students} = state;
  console.log(students)
  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  const collapsableStyle = {
    display: isCollapse ? 'none': 'flex'
  }

  const closeStyle = {
    display: isClosed ? 'none': 'flex'
  }



  return(
    <div className='flex-column flex-fill px-2 my-3 shadow' style={{...closeStyle,backgroundColor: 'white', width: '100%', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Students</strong>
        {/*<div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
          <input className='form-control form-control-sm mr-1'/>
          <input className='form-control form-control-sm mr-1'/>
          <button className='form-control form-control-sm' style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search</button>
        </div>*/}
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton}/>
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{...collapsableStyle, overflowX: 'auto'}}>
        <AllStudentTable students={students} dispatch={dispatch}/>  
      </div>

    </div>
  );
}

export default AllStudents;