import React from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faEdit, faSave, faDownload, faShare} from '@fortawesome/free-solid-svg-icons';



function MyProfile(props){

  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'My Profile'}/>
      <div className='d-flex flex-wrap px-2'>
        <div className='mr-3'>
          <FontAwesomeIcon icon={faImage} size='9x'/>
        </div>
        <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
          <div className='my-sm-2' style={{border: '2px solid green', padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 p-0 px-sm-2'><strong>Kolakanmi Apanisile</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 p-0 px-sm-2'><strong>Male</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Date of Birth:</p> <p className='col-8 p-0 px-sm-2'><strong>09/07/1997</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Religion:</p> <p className='col-8 p-0 px-sm-2'><strong>Christianity</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>E-mail:</p> <p className='col-8 p-0 px-sm-2'><strong>apanisilekolakanmi@gmail.com</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Home Address:</p> <p className='col-8 p-0 px-sm-2'><strong>4, Smith Lanre Street, Abule, Ijoko-Lemode</strong></p></div>          
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Phone No:</p> <p className='col-8 p-0 px-sm-2'><strong>08083330801</strong></p></div>          
          </div>
        </div> 
        <div className='d-flex my-2 mx-2'>
            <FontAwesomeIcon icon={faEdit} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faSave} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faDownload} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faShare} className='flex-fill p-1' size='lg' style={{backgroundColor: 'grey'}} />
          </div> 
      </div>

    </div>
  );
}

function Profile(props){

  return(
    <div className='d-flex flex-wrap'>
      <div style={{backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
        <SectionHeader sTitle={'Add New Account'}/>
        <div>
          <form className='mx-2'>
            <div className='my-3'>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >First Name</label>
                <input name='firstname' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Last Name</label>
                <input name='lastname' />
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Role</label>
                <select name='roles'>
                  <option value='admin'>Admin</option>
                  <option value='teacher'>Teacher</option>
                  <option value='parent'>Parent</option>
                  <option value='student'>Student</option>
                </select>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Mobile No</label>
                <input name='mobileno'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Email</label>
                <input name='email' type='email'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label >Address</label>
                <input name='address'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label for='picture'>Upload New User's Photo</label>
                <input name='picture' type='file' />
            </div>
          
            </div>

            
            <div>
              <button>Save</button>
            </div>

          </form>
        </div>
      </div>
      <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
        <MyProfile/>
      </div>
    </div>
  );
}

export default Profile;