import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';

function CreateFeesPayment(props){

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add New Book'}/>
      <div>
        <form className='mx-2'>
          <h3>Payment Information</h3>
          <div className='d-flex flex-wrap my-3'>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='firstname'>First Name</label>
              <input name='firstname' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='lastname'>Last Name</label>
              <input name='lastname' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='class'>Class</label>
              <input name='class'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='section'>Section</label>
              <input name='section'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='amountpaid'>Amount Paid</label>
              <input name='amountpaid'/>
            </div>
            <div className='d-flex flex-column mr-3 mb-3'>
              <label for='birth'>Upload Date</label>
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

export default CreateFeesPayment;