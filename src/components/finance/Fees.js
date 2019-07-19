import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faImage, faEye, faEdit, faDumpster} from '@fortawesome/free-solid-svg-icons';

function FeesTable(props){

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
      <table className='table'>
        <thead>
          <tr>
            <th>Admn No</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Parent's Name</th>
            <th>Paid Fees</th>
            <th>Due Fees</th>
            <th>Status</th>
            <th>Class</th>
            <th>Section</th>
            <th>Address</th>
            <th>Parent's Mobile</th>
            <th>Parent's Email</th>
            <th>Payment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1000</td>
            <td><FontAwesomeIcon icon={faImage}/></td>
            <td>Kolakanmi Apanisile</td>
            <td>Male</td>
            <td>Oladotun Apanisile</td>
            <td>9,000</td>
            <td>1,000</td>
            <td>Due</td>
            <td>Finished</td>
            <td>A</td>
            <td>4, Smith Lanre Taiwo Street</td>
            <td>08083330801</td>
            <td>oladotunapanisile@gmail.com</td>
            <td>01/01/2012</td>
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

function Fees(props){

  return(
    <div className='d-flex flex-column flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%', maxHeight: '300px', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>Student Fees Table</strong>
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
        <FeesTable/>  
      </div>

    </div>
  );
}

export default Fees;