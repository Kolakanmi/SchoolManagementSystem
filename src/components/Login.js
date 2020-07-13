import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import {AppContext} from './../contexts/AppContext';
import axios from 'axios'


function LoginPage(props){

  const [state, dispatch] = useContext(AppContext);
  const [userDetails, setUserDetails] = useState({});
  let {profile} = state;
  //const [userPassword, setuserPassword] = useState('');   
  useEffect(() =>{
    let isSubscribed = true;
    if (profile !== undefined && profile.details !== undefined && profile.role === 'admin' ) {
      props.history.push('/dashboard')
    } else if (profile !== undefined && profile.details !== undefined && profile.role === 'teacher') {
      props.history.push('/dashboard/teacher')
    } else if (profile !== undefined && profile.details !== undefined && profile.role === 'parent'){
      props.history.push('/dashboard/parent')
    }
    return () => {isSubscribed = false}
  });

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

  function handleSubmit(event){
    
    //JSON.stringify(userDetails);
    event.preventDefault();

    async function getProfile(){
      let result = await axios.post('/v1/api/login', JSON.stringify(userDetails));
      if (result.status === 401){
        console.log('Unauthorised')
      } else {
        dispatch({type: 'ADD_PROFILE', payload: result.data});
        console.log(result.data);
        console.log('profile', state.profile);
        //state.profile = result.data;
        props.setAuth(true);
        //props.history.push('/dashboard')
      }
      
    }
    getProfile();

  
    //props.history.push('/dashboard/parent')

    
    console.log(props.auth)
    
  }
  return(
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup>
            <Label>Email Address</Label>
            <Input name='email' type='email' value={userDetails.email} onChange={onInputChange} />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup>
            <Label>Password</Label>
            <Input name='password' type='password' value={userDetails.password} onChange={onInputChange}/>
          </FormGroup>
        </Row>
        <Button style={{backgroundColor: 'teal'}}>Login</Button>
      </Form>

    </div>
  )

}

export default LoginPage;