import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faArrowDown, faDumpster, faEdit, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import {AppContext} from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import {Link} from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios'
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import useAxiosConfig from "../../lib/AxiosConfig";
import {Redirect} from 'react-router-dom'


function AllTeachersTable({teachers, dispatch}){

    let config = useAxiosConfig();

  async function deleteTeacher(teachId){
    await axios.delete('/v1/api/delete-teacher/'+teachId, config)
        .then(result => {
          if (result.status === 200){
            let action = {type: 'DELETE_TEACHER', payload: teachId};
            dispatch(action)
          }
        })
  }

  async function makeTeacherAdmin(teachId) {
    await axios.get('/v1/api/update-teacher-to-admin/'+teachId, config)
        .then(result => {
          if (result.status === 200){
             dispatch({type: 'EDIT_TEACHER', payload: result.data})
          } if (result.status === 401) {
                return <Redirect to='/login'/>
            }
        })
        .catch(error => {
            console.log(error)
            return <Redirect to='/login'/>
        })
  }

  async function makeAdminTeacher(teachId) {
    await axios.get('/v1/api/update-teacher-to-teacher/'+teachId, config)
        .then(result => {
          if (result.status === 200){
              dispatch({type: 'EDIT_TEACHER', payload: result.data})
          } if (result.status === 401) {
              return <Redirect to='/login'/>
            }
        })
        .catch(error => {
            console.log(error)
            return <Redirect to='/login'/>
        })
  }

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Empl No</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Subjects Taking</th>
            <th>Class</th>
            <th>Section</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Empl Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.sort((a,b) => {return a.employmentNumber - b.employmentNumber}).map(teacher => {return <tr key={teacher.employmentNumber}>
            <td>{teacher.employmentNumber}</td>
            <td><img className='rounded' alt="Teacher" style={{width: '25px', height: '25px'}} src={'/' + teacher.picture}/></td>
            <td>{teacher.firstName + ' ' + teacher.lastName}</td>
            <td>{teacher.gender}</td>
            <td>{teacher.subjects}</td>
            <td>{teacher.class}</td>
            <td>{teacher.section} </td>
            <td>{teacher.address}</td>
            <td>{new Date(teacher.dateOfBirth).toDateString()}</td>
            <td>{teacher.mobileNumber} </td>
            <td>{teacher.email} </td>
            <td>{new Date(teacher.employmentDate).toDateString()}</td>
            <td className='flex-fill' style={{minWidth: '80px'}}>
              <Link to={'/teachers/teacher-details/'+teacher.employmentNumber}><FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/></Link>
              <Link to={'/teachers/edit-teacher/'+teacher.employmentNumber}><FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}/></Link>
              <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}} onClick={() => deleteTeacher(teacher.employmentNumber)}/>
              {(teacher.role === 'teacher') ? <FontAwesomeIcon icon={faArrowUp} color='blue' onClick={() => makeTeacherAdmin(teacher.employmentNumber)} /> : ''}
              {(teacher.role === 'admin') ? <FontAwesomeIcon icon={faArrowDown} color='yellow' onClick={() => makeAdminTeacher(teacher.employmentNumber)}/> : ''}
            </td>
          </tr>})}
        </tbody>
      </table>
    </div>
  );
}

function AllTeachers(){

  const [state, dispatch] = useContext(AppContext);
  const {teachers} = state;
  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  console.log(teachers);
  const collapsableStyle = {
    display: isCollapse ? 'none': 'flex'
  };

  const closeStyle = {
    display: isClosed ? 'none': 'flex'
  };

  return(
    <div className='flex-column flex-fill px-2 my-3 shadow' style={{...closeStyle,backgroundColor: 'white', width: '100%', maxHeight: '300px', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Teachers</strong>
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton} />
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{...collapsableStyle, overflowX: 'auto'}}>
        <AllTeachersTable teachers={teachers} dispatch={dispatch}/>
      </div>

    </div>
  );
}

export default AllTeachers;