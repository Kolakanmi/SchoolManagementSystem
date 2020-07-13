import React, {useContext, useState} from 'react'
import {Button, Form, FormFeedback, FormGroup, Input, Label, Row} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import axios from "axios";
import {AppContext} from "../contexts/AppContext";
import fakeAuth from "../lib/Auth";

function Log(props) {

    const [userDetails, setUserDetails] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [state, dispatch] = useContext(AppContext);
    const {profile} = state;
    let [fieldErrors, setFieldErrors] = useState({});
    let [updater, setUpdater] = useState(false);
    /*const { from } = props.location.state || { from: { pathname: (profile !== undefined && profile.details !== undefined && profile.role === 'admin' ) ?
                '/dashboard' : (profile !== undefined && profile.details !== undefined && profile.role === 'teacher') ? '/dashboard/teacher' :
                    '/dashboard/parent'
    } }*/

    function onInputChange(e){
        const target = e.target;
        if (target.name === 'email'){
            userDetails.email = target.value;
        }
        if (target.name === 'password'){
            userDetails.password = target.value;
        }
        setUserDetails({...userDetails});
    }

    if (redirect === true) {
        return <Redirect to={(profile !== undefined && profile.details !== undefined && profile.role === 'Admin') ?
            '/' : (profile !== undefined && profile.details !== undefined && profile.role === 'admin') ? '/' :
                (profile !== undefined && profile.details !== undefined && profile.role === 'teacher') ? '/dashboard/teacher' :
                '/dashboard/parent'}/>
    }

    function handleSubmit(event){

        //JSON.stringify(userDetails);
        event.preventDefault();

        async function getProfile(){
            await axios.post('/v1/api/login', JSON.stringify(userDetails))
                .then((result) => {
                    if (result.status === 200){
                        dispatch({type: 'ADD_PROFILE', payload: result.data});
                        console.log(result.data);
                        console.log('profile', state.profile);
                        fakeAuth.authenticate(() => {
                            setRedirect(true)
                        })

                    } else {
                        console.log('Unauthorised')
                        let errors = {};
                        errors.email = true;
                        errors.password = true;
                        setFieldErrors(errors)
                        console.log(fieldErrors)
                        setUpdater(!updater)
                    }
                })
                .catch((error) => {
                    console.log('Unauthorised')
                    console.log(error)
                    let errors = {};
                    errors.email = true;
                    errors.password = true;
                    setFieldErrors(errors)
                    console.log(fieldErrors)
                    setUpdater(!updater)
                })

        }
        getProfile()


        //props.history.push('/dashboard/parent')


        //console.log(props.auth)

    }

    return(
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center p-3">
            <h3 style={{color: 'teal', fontFamily: 'Times New Roman', textAlign: 'center'}}>WELCOME TO ELIS GLOBAL COLLEGE</h3>
            <Form className='align-self-center' onSubmit={handleSubmit}>
                <Row>
                    <FormGroup>
                        <Label><strong>Email Address</strong></Label>
                        <Input invalid={fieldErrors.email === true}
                               name='email' type='email' value={userDetails.email} onChange={onInputChange} />
                        <FormFeedback invalid>Invalid Email/Password</FormFeedback>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label><strong>Password</strong></Label>
                        <Input invalid={fieldErrors.password === true}
                               name='password' type='password' value={userDetails.password} onChange={onInputChange}/>
                        <FormFeedback invalid>Invalid Email/Password</FormFeedback>
                    </FormGroup>
                </Row>
                <Button style={{backgroundColor: 'teal'}}>Login</Button>
            </Form>

        </div>
    )
}

export default Log;
