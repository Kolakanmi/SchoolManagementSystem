import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';

function AddTeacher(props){

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add New Teacher'}/>
      <div>
        <form className='mx-2'>
          <h3>Teacher's Information</h3>
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
              <label for='mobilenumber'>Mobile Number</label>
              <input name='mobilenumber'/>
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='email'>Email</label>
              <input name='email' type='email' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
              <label for='employmentnumber'>Employment Number</label>
              <input name='employmentnumber' />
            </div>
            <div className='d-flex flex-column flex-fill mr-3'>
              <label for='class'>Subjects</label>
              <select id='class'>
                <option value=''> Mathematics </option>
                <option value='' >English </option>
                <option value='' >Physics </option>
                <option value='' >Chemistry</option>
                <option value='' >Biology</option>
                <option value='' >Further Mathematics</option>
                <option value='' >Economics</option>
                <option value='' >Geography</option>
              </select>
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

export default AddTeacher;