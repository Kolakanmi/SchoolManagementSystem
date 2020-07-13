import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import {Redirect} from 'react-router-dom';
import {Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import {returnClassesArray, returnSectionArray} from "../../lib/ReturnNeededArray";
import FormFeedback from "reactstrap/es/FormFeedback";
import useAxiosConfig from "../../lib/AxiosConfig";

function AddTeacher(props){

  const [state, dispatch] = useContext(AppContext);
  let {teachers, classes} = state;
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let nextYear = currentYear + 1;
  if (currentDate.getMonth() < 8 ) {
    currentYear = currentYear - 1;
    nextYear = currentYear + 2;
  }
  let mn = [0];
  if (teachers.length !== 0) {
    mn = teachers.map(x =>  {
      return Number(x.employmentNumber.slice(11));
    })
  }
  let adn = Math.max(...mn) + 1;
  const initialTeacher = {
    employmentNumber: "T"+currentYear+"-"+nextYear+"-"+ adn,
    firstName: '',
    lastName: '',
    class: '',
    section: '',
    institution: '',
    degree: '',
    course: '',
    grade: '',
    mobileNumber: '',
    subjects: [],
    email: '',
    gender: 'Male',
    dateOfBirth: '',
    religion: '',
    picture: '',
    address: '',
    employmentDate: '',
    deduction: '',
    salary: [
      {
        session: '',
        term: '',
        month: '',
        payments: [
          {
            amountToBePaid: '',
            amountPaid: '',
            amountDue: '',
            paymentDate: '',
          }
        ]
      }
    ]
  
  };


  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  let config = useAxiosConfig();
  

  let editableTeacherId;
  if (props.match.params.id) {
    editableTeacherId = props.match.params.id;
  }
  let editableTeacher = initialTeacher;
  
  if(editableTeacherId) {
    if(state.teachers.length !== 0){
      editableTeacher = state.teachers.find(teacher => teacher.employmentNumber === editableTeacherId);    
    }   
  }


  const [newTeacher, setNewTeacher] = useState(editableTeacher);

  const [theSize, setTheSize] = useState(1);

  const [fieldErrors, setFieldErrors] = useState({});

  if(editableTeacherId && (state.teachers.length === 0) ){
    return(<Redirect to='/teachers/add-teacher'/>)
  }



  const collapsableStyle = {
    display: isCollapse ? 'none': 'block'
  };

  const closeStyle = {
    display: isClosed ? 'none': 'block'
  };

  function onInputChange(e) {
    const target = e.target;
    if(e.target.name === 'picture') {
      newTeacher.picture = target.files[0];
    }else if (e.target.name === 'subjects') {
      newTeacher.subjects = [...target.selectedOptions].map(o => o.value);
    }else newTeacher[target.name] = target.value;
    setNewTeacher({...newTeacher});
  }

  function handleAddTeacher(event){
    event.preventDefault();
    //console.log(fileInput.current.files[0].name);
    newTeacher.employmentNumber = editableTeacher.employmentNumber; //|| state.teachers.length + 1;
    const date = new Date();
    let errors = validate(newTeacher);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;
    newTeacher.employmentDate = editableTeacherId ? newTeacher.employmentDate : date.toISOString();
    newTeacher.dateOfBirth = new Date(newTeacher.dateOfBirth).toISOString();
    if(!editableTeacherId){
      //newTeacher.picture = fileInput.current.files[0].name;
    }
    setNewTeacher({...newTeacher});

    let teacherDetails = new FormData();
    teacherDetails.append('Picture', newTeacher.picture);
    teacherDetails.append('EmploymentNumber', newTeacher.employmentNumber);
    teacherDetails.append('FirstName', newTeacher.firstName);
    teacherDetails.append('LastName', newTeacher.lastName);
    teacherDetails.append('MobileNumber', newTeacher.mobileNumber);
    teacherDetails.append('Gender', newTeacher.gender);
    teacherDetails.append('Email', newTeacher.email);
    teacherDetails.append('DateOfBirth', newTeacher.dateOfBirth);
    teacherDetails.append('Institution', newTeacher.institution);
    teacherDetails.append('Degree', newTeacher.degree);
    teacherDetails.append('Grade', newTeacher.grade);
    teacherDetails.append('Course', newTeacher.course);
    teacherDetails.append('Religion', newTeacher.religion);
    teacherDetails.append('Address', newTeacher.address);
    teacherDetails.append('EmploymentDate', newTeacher.employmentDate);
    teacherDetails.append('Role', "teacher");

    console.log('NewTeacher, ', newTeacher);

    async function postTeacher(){
      let action;
      if(editableTeacherId){
        await axios.put('/v1/api/update-teacher', teacherDetails, config)
            .then(result => {
              if (result.status === 200) {
                action = {type: 'EDIT_TEACHER', payload: result.data};
                dispatch(action);
              } if (result.status === 401) {
                return <Redirect to='/login'/>
              }
            })
            .catch(error => {
              console.log(error)
              return <Redirect to='/login'/>
            })
      } else {
        await axios.post('/v1/api/post-teacher', teacherDetails, config)
            .then(result => {
              if (result.status === 200){
                action = {type: 'ADD_TEACHER', payload: result.data};
                dispatch(action);
              } if (result.status === 401) {
                return <Redirect to='/login'/>
              }
            })
            .catch(error => {
              console.log(error)
              return <Redirect to='/login'/>
            })
      }
    }
    postTeacher();
    setNewTeacher({...initialTeacher});
    if(editableTeacherId){
      props.history.goBack();
    }
  }

  return(
    <div className='shadow' style={{...closeStyle, backgroundColor: 'white'}}>
      <SectionHeader sTitle={'Add New Teacher'} toggleCollapse = {collapseButton} toggleClose = {closeButton}/>
      <div className='px-3' style={collapsableStyle}>
        <Form className='px-2' onSubmit={handleAddTeacher}>
          <Row className='d-flex flex-wrap'>
            <FormGroup className='flex-fill mr-3'>
              <Label>First Name</Label>
              <Input invalid={fieldErrors.firstName === true} name='firstName' value={newTeacher.firstName} onChange={onInputChange}/>
              <FormFeedback invalid>Insert First Name</FormFeedback>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Last Name</Label>
              <Input invalid={fieldErrors.lastName === true} name='lastName' value={newTeacher.lastName} onChange={onInputChange}/>
              <FormFeedback invalid>Insert Last Name</FormFeedback>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Email</Label>
              <Input invalid={fieldErrors.email === true} type='email' name='email' value={newTeacher.email} onChange={onInputChange} />
              <FormFeedback invalid>Insert Email</FormFeedback>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Mobile Number</Label>
              <Input invalid={fieldErrors.mobileNumber === true} name='mobileNumber' value={newTeacher.mobileNumber} onChange={onInputChange}/>
              <FormFeedback invalid>Insert Mobile Number</FormFeedback>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Gender</Label>
              <Input type='select' name='gender' value={newTeacher.gender} onChange={onInputChange}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </Input>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Employment Number</Label>
              <Input name='employmentNumber' value={editableTeacher.employmentNumber} onChange={onInputChange} disabled/>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Tertiary Institution</Label>
              <Input name='institution' value={newTeacher.institution} onChange={onInputChange}/>
            </FormGroup>
            <FormGroup className='d-flex flex-fill flex-wrap mr-3 px-0'>
              <Col className='pl-0 ml-0' sm={4}>
                <Label>Degree</Label>
                <Input type='select' name='degree' value={newTeacher.degree} onChange={onInputChange}>
                  <option value=' '> </option>
                  <option value='M.Sc'>M.Sc</option>
                  <option value='B.Sc'>B.Sc</option>
                  <option value='HND'>HND</option>
                  <option value='OND'>OND</option>
                  <option value='NCE'>NCE</option>
                  <option value='SSCE'>SSCE</option>
                </Input>
              </Col>
              <Col sm={8} className='pl-0 ml-0'>
                <Label>Course of Study</Label>
                <Input name='course' value={newTeacher.course} onChange={onInputChange}/>
              </Col>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Grade</Label>
              <Input type='select' name='grade' value={newTeacher.grade} onChange={onInputChange}>
                <option value=' '> </option>
                <option value='First Class'>First Class</option>
                <option value='Second Class Upper'>Second Class Upper</option>
                <option value='Second Class Lower'>Second Class Lower</option>
                <option value='Third Class'>Third Class</option>
                <option value='Pass'>Pass</option>
              </Input>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Class Teacher of:</Label>
              <Input type='select' name='class' value={newTeacher.class} onChange={onInputChange}>
                <option value=' '> </option>
                {returnClassesArray(classes).map((v,i) => {
                  return <option key={i} value={v}>{v}</option>
                })}
              </Input>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Section</Label>
              <Input type='select' name='section' value={newTeacher.section} onChange={onInputChange}>
                <option value=' '> </option>
                {returnSectionArray(classes).map((v,i) => {
                  return  <option key={i} value={v}>{v}</option>
                })}
              </Input>
            </FormGroup>
          {/*  <FormGroup className='flex-fill mr-3'>
              <Label>Subjects Taking</Label>
              <Input type='select' size={theSize} name='subjects' value={newTeacher.subjects} onChange={onInputChange} onMouseEnter={() => setTheSize(4)} onMouseLeave={() => setTheSize(1)} multiple>
                <option value='Mathematics'>Mathematics</option>
                <option value='English'>English</option>
                <option value='Physics'>Physics</option>
                <option value='Chemistry'>Chemistry</option>
              </Input>
            </FormGroup>*/}
            <FormGroup className='flex-fill mr-3'>
              <Label>Date Of Birth</Label>
              <Input invalid={fieldErrors.dateOfBirth === true} name='dateOfBirth' type='date' value={newTeacher.dateOfBirth} onChange={onInputChange}/>
              <FormFeedback invalid>Select Date</FormFeedback>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Religion</Label>
              <Input name='religion' type='select' value={newTeacher.religion} onChange={onInputChange}>
                <option value=' '></option>
                <option value='Christianity'>Christianity</option>
                <option value='Islam'>Islam</option>
              </Input>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Picture</Label>
              <Input invalid={fieldErrors.picture === true} name='picture' type='file' onChange={onInputChange}/>
              {/*<img style={{width: '20px', height: '20px'}} alt="uploaded" src={''}/>*/}
              <FormFeedback invalid>Insert Picture</FormFeedback>
            </FormGroup>
            <FormGroup className='flex-fill mr-3'>
              <Label>Address</Label>
              <Input name='address' type='textarea' maxLength={200} value={newTeacher.address} onChange={onInputChange}/>
            </FormGroup>
            
          </Row>
          <Button style={{backgroundColor: 'teal'}} type='submit'>Save</Button>
        </Form> 
      </div>
    </div>
  );
}

export default AddTeacher;

let validate = (student) => {
  let errors = {};
  //const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!student.firstName || student.firstName === '') errors.firstName = true;
  if (!student.lastName || student.lastName === '') errors.lastName = true;
  if (!student.email || student.email === '') errors.email = true;
  if (!student.mobileNumber || student.mobileNumber === '') errors.mobileNumber = true;
  if (!student.picture || student.picture === '' || student.picture.size === 0) errors.picture = true;
  if (!student.dateOfBirth || student.dateOfBirth === '') errors.dateOfBirth = true;

  return errors;

};