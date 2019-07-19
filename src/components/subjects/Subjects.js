import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faEye, faEdit, faDumpster} from '@fortawesome/free-solid-svg-icons';


function AllSubjectsTable(props){

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table'>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Class</th>
            <th>Periods Per Week</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MAT101</td>
            <td>Mathematics</td>
            <td>JSS1</td>
            <td>4</td>
            <td className='flex-fill' style={{minWidth: '80px'}}>
              <FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/>
              <FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}/>
              <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function AllSubjects(props){

  return(
    <div className='d-flex flex-column flex-fill px-2 shadow' style={{backgroundColor: 'white', width: '100%', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Subjects</strong>
        <div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
          <input className='form-control form-control-sm mr-1'/>
          <input className='form-control form-control-sm mr-1'/>
          <button className='form-control form-control-sm' style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search</button>
        </div>
        <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>
        
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <div style={{display: 'flex', overflowX: 'auto'}}>
        <AllSubjectsTable/>  
      </div>

    </div>
  );
}

function Subjects(props){

  return(
    <div className='d-flex flex-wrap'>
      <div style={{backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
        <SectionHeader sTitle={'Create New Subject'}/>
        <div>
          <form className='mx-2'>
            <div className='my-3'>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Subject Name</label>
                <input name='subjectname' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Subject Code</label>
                <input name='subjectcode' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Select Class</label>
                <input name='class'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Periods Per Week</label>
                <input name='periods'/>
              </div>
          
            </div>

            
            <div>
              <button>Save</button>
            </div>

          </form>
        </div>
      </div>
      <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
        <AllSubjects/>
      </div>
    </div>
  );
}

export default Subjects;