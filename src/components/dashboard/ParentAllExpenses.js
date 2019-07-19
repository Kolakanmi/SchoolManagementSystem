import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes} from '@fortawesome/free-solid-svg-icons'


function ParentExpensesTable(props){

  return(
    <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
      <table className='table'>
        <thead>
          <tr>
            <th>Expense Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fees</td>
            <td>1,500</td>
            <td>Paid</td>
            <td>01/01/2012</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ParentAllExpenses(props) {

  return(
    <div className='d-flex flex-column flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%', maxHeight: '300px', display: 'flex', overflowX: 'auto'}}>
      <div className='d-flex'>
        <strong className='align-self-center'>All Expenses</strong>
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
        <ParentExpensesTable/>  
      </div>

    </div>
  );
}

export default ParentAllExpenses;