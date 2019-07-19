import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faEye, faEdit, faDumpster} from '@fortawesome/free-solid-svg-icons';


function AllGradesTable(props){

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table'>
        <thead>
          <tr>
            <th>Grade Letter</th>
            <th>Grade Point</th>
            <th>Percent From</th>
            <th>Percent To</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A+</td>
            <td>5</td>
            <td>80</td>
            <td>100</td>
            <td>Excellent</td>
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

function AllGrades(props){

  return(
    <div className='d-flex flex-column flex-fill px-2 shadow' style={{backgroundColor: 'white', width: '100%', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Grades</strong>
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
        <AllGradesTable/>  
      </div>

    </div>
  );
}

function Grades(props){

  return(
    <div className='d-flex flex-wrap'>
      <div style={{backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
        <SectionHeader sTitle={'Create New Grade'}/>
        <div>
          <form className='mx-2'>
            <div className='my-3'>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Grade Letter</label>
                <input name='gradeletter' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Grade Point</label>
                <input name='gradepoint' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Percent From</label>
                <input name='percentfrom'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Percent To</label>
                <input name='percentto'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Comment</label>
                <input name='comment'/>
              </div>
          
            </div>

            
            <div>
              <button>Save</button>
            </div>

          </form>
        </div>
      </div>
      <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
        <AllGrades/>
      </div>
    </div>
  );
}

export default Grades;