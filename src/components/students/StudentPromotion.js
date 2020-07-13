import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';

function StudentPromotion(){

  return(
    <div style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Search Student Promotion'}/>
      <div className='d-flex flex-wrap mx-2'>
        <div className='d-flex flex-column flex-fill mr-3 mb-3'>
          <label for='session'>Current Session</label>
          <input name='session' list='session' placeholder='Please Select Session' />
          <datalist id='session'>
            <option value='2018-2019' />
            <option value='2019-2020' />
            <option value='2020-2021' />
          </datalist>
        </div>
        <div className='d-flex flex-column flex-fill mr-3 mb-3'>
          <label for='session'>Promote To Session</label>
          <input name='session' list='session' placeholder='Please Select Session' />
          <datalist id='session'>
            <option value='2018-2019' />
            <option value='2019-2020' />
            <option value='2020-2021' />
          </datalist>
        </div>
        <div className='d-flex flex-column flex-fill mr-3'>
          <label for='class'>Promotion From Class</label>
          <input name='class' list='class' placeholder='Please Select Class' />
          <datalist id='class'>
            <option value='JSS1' />
            <option value='JSS2' />
            <option value='JSS3' />
            <option value='SSS1' />
            <option value='SSS2' />
            <option value='SSS3' />
          </datalist>
        </div>
        <div className='d-flex flex-column flex-fill mr-3'>
          <label for='class'>Promotion To Class</label>
          <input name='class' list='class' placeholder='Please Select Class' />
          <datalist id='class'>
            <option value='JSS1' />
            <option value='JSS2' />
            <option value='JSS3' />
            <option value='SSS1' />
            <option value='SSS2' />
            <option value='SSS3' />
          </datalist>
        </div>
        
      </div>
      <div className='mx-2'>
        <button style={{backgroundColor: 'teal'}}>Search</button>
      </div>
    </div>
  );
}

export default StudentPromotion;