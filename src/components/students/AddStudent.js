import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';

function AddStudent(props){

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add Student Form'}/>
      <div>
        <form className='mx-2'>
          <h3>Student's Information</h3>
          <div className='d-flex flex-wrap my-3'>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='firstname'>First Name</label>
              <input name='firstname' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='lastname'>Last Name</label>
              <input name='lastname' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='class'>Class</label>
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
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='section'>Section</label>
              <input name='section' list='section' placeholder='Please Select Section' />
              <datalist id='section'>
                <option value='A' />
                <option value='B' />
                <option value='C' />
              </datalist>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='gender'>Gender</label>
              <input name='gender' list='gender' placeholder='Please Select Gender' />
              <datalist id='gender'>
                <option value='Male' />
                <option value='Female' />
              </datalist>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='birth'>Date of Birth</label>
              <input name='birth' type='date' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='admissionnumber'>Admission Number</label>
              <input name='admissionnumber' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='religion'>Religion</label>
              <input name='religion' list='religion' placeholder='Please Select Religion' />
              <datalist id='religion'>
                <option value='Christianity' />
                <option value='Islam' />
              </datalist>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='picture'>Upload Student's Photo</label>
              <input name='picture' type='file' />
            </div>
          </div>

          <h3>Parent's Information</h3>
          <div className='d-flex flex-wrap'>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='fathername'>Father's Name</label>
              <input name='fathername' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='fathernumber'>Father's Phone No</label>
              <input name='fathernumber'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='fatheremail'>Father's Email</label>
              <input name='fatheremail' type='email' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='fatheroccupation'>Father's Occupation</label>
              <input name='fatheroccupation'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='mothername'>Mother's Name</label>
              <input name='mothername' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='mothernumber'>Mother's Phone No</label>
              <input name='mothernumber' />
            </div>  
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='motheremail'>Mother's Email</label>
              <input name='motheremail' type='email' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='motheroccupation'>Mother's Occupation</label>
              <input name='motheroccupation' />
            </div>  
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='address'>Residential Address</label>
              <input name='address' />
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

export default AddStudent;