import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faImage, faEye, faEdit, faDumpster} from '@fortawesome/free-solid-svg-icons';

function AllParentsTable(props){

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><FontAwesomeIcon icon={faImage}/></td>
            <td>Kolakanmi Apanisile</td>
            <td>Male</td>
            <td>Teaching</td>
            <td>4, Smith Lanre Taiwo Street</td>
            <td>08083330801</td>
            <td>oladotunapanisile@gmail.com</td>
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

function AllParents(props){

  return(
    <div className='d-flex flex-column flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%', maxHeight: '300px', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Students</strong>
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
        <AllParentsTable/>  
      </div>

    </div>
  );
}

export default AllParents;