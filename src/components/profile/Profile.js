import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios'


function MyProfile() {

    const [state, dispatch] = useContext(AppContext);


    let {profile} = state;
    console.log(profile);
    return (
        <div className='shadow' style={{backgroundColor: 'white'}}>
            <SectionHeader sTitle={'My Profile'}/>
            <div className='d-flex flex-fill flex-wrap px-2'>
                <div className='mr-3'>
                    <img className='rounded' alt="Profile" style={{width: '25px', height: '25px'}} src={'/' + profile.details.picture}/>
                </div>
                <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
                    <div className='my-sm-2' style={{padding: '0px', fontSize: '0.8rem', wordWrap: 'break-word'}}>
                        <div className='d-flex' style={{padding: '0px'}}><p className='col-4 p-0 px-sm-2'>Name:</p> <p
                            className='col-8 p-0 px-sm-2'><strong>{profile.details.lastName}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}}><p className='col-4 p-0 px-sm-2'>Gender:</p> <p
                            className='col-8 p-0 px-sm-2'><strong>{profile.details.gender}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}}><p className='col-4 p-0 px-sm-2'>Date of
                            Birth:</p> <p className='col-8 p-0 px-sm-2'>
                            <strong>{new Date(profile.details.dateOfBirth).toDateString()}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}}><p className='col-4 p-0 px-sm-2'>Religion:</p>
                            <p className='col-8 p-0 px-sm-2'><strong>{profile.details.religion}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}}><p className='col-4 p-0 px-sm-2'>E-mail:</p> <p
                            className='col-8 p-0 px-sm-2'><strong>{profile.details.email}</strong></p></div>
                        <div className='d-flex' style={{padding: '0px'}}><p className='col-4 p-0 px-sm-2'>Home
                            Address:</p> <p className='col-8 p-0 px-sm-2'><strong>{profile.details.address}</strong></p>
                        </div>
                        <div className='d-flex' style={{padding: '0px'}}><p className='col-4 p-0 px-sm-2'>Phone No:</p>
                            <p className='col-8 p-0 px-sm-2'><strong>{profile.details.mobileNumber}</strong></p></div>
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

function Profile() {

    const [state, dispatch] = useContext(AppContext);
    let {profile} = state;
    const [newAdmin, setNewAdmin] = useState({
        email: '',
        password: '',
        role: 'Admin'
    });

    function saveAdmin(event) {
        event.preventDefault();
        async function changePassParent() {
            await axios.post('/v1/api/post-admin', JSON.stringify(newAdmin))
                .then(result => {
                    if (result.status === 200) {
                        console.log('Password Changed')
                    }
                })
        }
    }

    function onInputChange(e) {
        let target = e.target;
        newAdmin[target.name] = target.value;
        setNewAdmin({...newAdmin})
    }

    return (
        <div className='d-flex flex-wrap'>
            {(profile.role === 'Admin') ? <div style={{backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
                <SectionHeader sTitle={'Add New Admin'}/>
                <div>
                    <form className='mx-2' onSubmit={saveAdmin}>
                        <div className='my-3'>
                            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                                <label>Email</label>
                                <input name='email' type='email' value={newAdmin.email} onChange={onInputChange}/>
                            </div>
                            <div className='d-flex flex-column flex-fill mr-3 mb-3'>
                                <label>Password</label>
                                <input name='password' type='password' onChange={onInputChange}/>
                            </div>

                        </div>


                        <div>
                            <button style={{backgroundColor: 'teal'}}>Save</button>
                        </div>

                    </form>
                </div>
            </div> : <div></div>}
            <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
                <MyProfile/>
            </div>
            <div>
                {(profile.role === 'admin' || profile.role === 'Admin') ? <EndTermAndSession/> : <div></div>}
            </div>
        </div>
    );
}

function PasswordChange({profile}) {

    const [emailPass, setEmailPass] = useState({
        email: profile.details.email,
        password: ''
    });
    const [result, setResult] = useState('');

    function onInputChange(event) {
        let target = event.target;
        emailPass[target.name] = target.value;
        setEmailPass({...emailPass})
    }

    function handleChangePassword(event) {
        event.preventDefault();

        async function changePassParent() {
            await axios.put('/v1/api/update-parent-password', JSON.stringify(emailPass))
                .then(result => {
                    if (result.status === 200) {
                        console.log('Password Changed');
                        setResult(result.data)
                    }
                })
        }

        async function changePassTeacher() {
            console.log(emailPass);
            await axios.put('/v1/api/update-teacher-password', JSON.stringify(emailPass))
                .then(result => {
                    if (result.status === 200) {

                        console.log(result);
                        setResult(result.data)
                    }
                })
        }

        async function changePassAdmin() {
            await axios.put('/v1/api/update-admin-password', JSON.stringify(emailPass))
                .then(result => {
                    if (result.status === 200) {
                        console.log('Password Changed');
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
                <Button style={{backgroundColor: 'teal'}}>Save</Button>
            </Form>
        </div>
    )
}


function EndTermAndSession() {

    const [state, dispatch] = useContext(AppContext);
    let {profile} = state;

    async function endTerm() {
        await axios.get('/v1/api/end-this-term')
            .then(result => {
                if (result.status === 200){
                    console.log(result.data)
                }
            })
    }

    async function endSession() {
        await axios.get('/v1/api/end-this-session')
            .then(result => {
                if (result.status === 200){
                    console.log(result.data)
                }
            })
    }

    return (
        <div className='my-3 flex-fill p-3' style={{backgroundColor: 'white'}}>
            <h3 className='py-2' style={{color: 'black', fontFamily: 'Times New Roman'}}>End Term To Calculate Results Then Start New
                Term</h3>
            <Button disabled={profile.term === "Third"} onClick={endTerm}>End Term</Button>

            <h3 className='py-2' style={{color: 'black', fontFamily: 'Times New Roman'}}>End Session And Promote Students</h3>
            <Button style={{backgroundColor: 'teal'}} disabled={profile.term === "First" || profile.term === "Second"} onClick={endSession}>End Session</Button>
        </div>
    )
}

export default Profile;