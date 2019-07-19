import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';

function AddClass(props){

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add Class'}/>
      <div>
        <form className='mx-2'>
          <div className='d-flex flex-wrap my-3'>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label >Teacher's Name</label>
              <input name='teachername' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label >Class</label>
              <input name='class' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label >Section</label>
              <input name='section'/>
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

export default AddClass;