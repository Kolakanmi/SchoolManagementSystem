import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {AppContext} from '../../contexts/AppContext';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios'


function MyProfile(props){

  const [state, dispatch] = useContext(AppContext);

  let {profile} = state;
  console.log(profile);
  return(
    <div className='shadow' style={{backgroundColor: 'white'}}>
      <SectionHeader sTitle={'My Profile'}/>
      <div className='d-flex flex-fill flex-wrap px-2'>
        <div className='mr-3'>
          <FontAwesomeIcon icon={faImage} size='9x'/>
        </div>
        <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
          <div className='my-sm-2' style={{padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Name:</p> <p className='col-8 p-0 px-sm-2'><strong>{profile.details.lastName}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Gender:</p> <p className='col-8 p-0 px-sm-2'><strong>{profile.details.gender}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Date of Birth:</p> <p className='col-8 p-0 px-sm-2'><strong>{new Date(profile.details.dateOfBirth).toDateString()}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Religion:</p> <p className='col-8 p-0 px-sm-2'><strong>{profile.details.religion}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>E-mail:</p> <p className='col-8 p-0 px-sm-2'><strong>{profile.details.email}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Home Address:</p> <p className='col-8 p-0 px-sm-2'><strong>{profile.details.address}</strong></p></div>
            <div className='d-flex' style={{padding: '0px'}} ><p className='col-4 p-0 px-sm-2'>Phone No:</p> <p className='col-8 p-0 px-sm-2'><strong>{profile.details.mobileNumber}</strong></p></div>
          </div>
        </div> 
        {/*<div className='d-flex my-2 mx-2'>
            <FontAwesomeIcon icon={faEdit} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faSave} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faDownload} className='flex-fill mr-2 p-1' size='lg' style={{backgroundColor: 'grey'}} />
            <FontAwesomeIcon icon={faShare} className='flex-fill p-1' size='lg' style={{backgroundColor: 'grey'}} />
          </div>*/}
      </div>
        <PasswordChange profile={profile}/>
    </div>
  );
}

function Profile(props){

  const [state, dispatch] = useContext(AppContext);
  let {profile} = state;

  return(
    <div className='d-flex flex-wrap'>
      {(profile.role === 'admin') ? <div style={{backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
        <SectionHeader sTitle={'Add New Account'}/>
        <div>
          <form className='mx-2'>
            <div className='my-3'>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label>First Name</label>
                <input name='firstname'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label>Last Name</label>
                <input name='lastname'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label>Role</label>
                <select name='roles'>
                  <option value='admin'>Admin</option>
                  <option value='teacher'>Teacher</option>
                  <option value='parent'>Parent</option>
                  <option value='student'>Student</option>
                </select>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label>Mobile No</label>
                <input name='mobileno'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label>Email</label>
                <input name='email' type='email'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label>Address</label>
                <input name='address'/>
              </div>
              <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                <label htmlFor='picture'>Upload New User's Photo</label>
                <input name='picture' type='file'/>
              </div>

            </div>


            <div>
              <button>Save</button>
            </div>

          </form>
        </div>
      </div> : <div></div>}
      <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
        <MyProfile/>
      </div>
    </div>
  );
}

function PasswordChange({profile}) {

    const [emailPass, setEmailPass] = useState({
        email: profile.details.email,
        password: ''
    })
    const [result, setResult] = useState('')

    function onInputChange(event) {
        let target = event.target;
        emailPass[target.name] = target.value;
        setEmailPass({...emailPass})
    }
    function handleChangePassword(event) {
        event.preventDefault();
        async function changePassParent() {
            await axios.post('http://localhost:8080/v1/api/update-parent-password', JSON.stringify(emailPass))
                .then(result => {
                    if (result.status === 200) {
                        console.log('Password Changed')
                        setResult(result.data)
                    }
                })
        }

        async function changePassTeacher() {
            console.log(emailPass)
            await axios.post('http://localhost:8080/v1/api/update-teacher-password', JSON.stringify(emailPass))
                .then(result => {
                    if (result.status === 200) {

                        console.log(result)
                        setResult(result.data)
                    }
                })
        }

        async function changePassAdmin() {
            await axios.post('http://localhost:8080/v1/api/', JSON.stringify(emailPass))
                .then(result => {
                    if (result.status === 200) {
                        console.log('Password Changed')
                        setResult(result.data)
                    }
                })
        }

        if (profile.role === 'admin') {
            changePassAdmin()
        }
        if (profile.role === 'teacher') {
            changePassTeacher()
        }
        if (profile.role === 'parent') {
            changePassParent()
        }

    }

    return (
        <div className='px-3 py-3'>
            <h3>Change Password</h3>
            <Form className='px-3' onSubmit={handleChangePassword}>
                <FormGroup>
                    <Label>Email Address</Label>
                    <Input name='email' type='email' value={emailPass.email} disabled/>
                </FormGroup>
                <FormGroup>
                    <Label>New Password</Label>
                    <Input name='password' type='password' value={emailPass.password} onChange={onInputChange}/>
                    <FormFeedback valid>{result}</FormFeedback>
                </FormGroup>
                <Button>Save</Button>
            </Form>
        </div>
    )
}

export default Profile;