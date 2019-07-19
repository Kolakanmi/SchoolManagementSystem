import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';

function AddExpense(props){

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add Expense'}/>
      <div>
        <form className='mx-2'>
          <div className='d-flex flex-wrap my-3'>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label >First Name</label>
              <input name='firstname' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label >Last Name</label>
              <input name='lastname' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label >Expense Type</label>
              <input name='expensetype'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label >Amount Paid</label>
              <input name='amountpaid'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label >Mobile No</label>
              <input name='mobilenumber'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label>Email</label>
              <input name='email' type='email'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label >Upload Date</label>
              <input name='birth' type='date' />
            </div>
        
          </div>

          
          <div>
            <button>Save</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddExpense;