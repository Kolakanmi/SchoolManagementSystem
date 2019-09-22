import React, {useContext, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import axios from "axios";
import {returnClassesArray, returnSectionArray} from "../../lib/ReturnNeededArray";


function AddStudent(props) {

    const [state, dispatch] = useContext(AppContext);
    let {students, classes} = state;

    console.log('classes', returnClassesArray(classes))
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let nextYear = currentYear + 1;
    if (currentDate.getMonth() < 8) {
        currentYear = currentYear - 1;
        nextYear = currentYear + 2;
    }
    let st = students;
    let mn = [0];
    if (st.length !== 0) {
        mn = st.map(x => {
            return Number(x.admissionNumber.slice(10));
        })
    }
    //console.log("mn", mn);
    let adn = Math.max(...mn) + 1;
    const initialFees = {
        amountPaid: '',
        amountDue: '',
        status: '',
        datePaid: ''
    }

    const initialStudent = {
        admissionNumber: currentYear + "-" + nextYear + "-" + adn,
        firstName: '',
        lastName: '',
        class: '',
        section: '',
        gender: 'Male',
        dateOfBirth: '',
        religion: '',
        picture: '',
        parents: [{
            firstName: '',
            mobileNumber: '',
            email: '',
            occupation: ''
        }, {
            firstName: '',
            mobileNumber: '',
            email: '',
            occupation: ''
        }],
        address: ''

    }

    const fileInput = useRef(null);

    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();


    let editableStudentId;
    if (props.match.params.id) {
        editableStudentId = props.match.params.id;
    }
    let editableStudent = initialStudent;

    if (editableStudentId) {
        if (state.students.length !== 0) {
            editableStudent = state.students.find(student => student.admissionNumber === editableStudentId);
        }
    }


    const [newStudent, setNewStudent] = useState(editableStudent);


    if (editableStudentId && (state.students.length === 0)) {
        return (<Redirect to='/students/add-student'/>)
    }


    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    }

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    }

    function onInputChange(e) {
        const target = e.target;
        if (target.name === 'picture') {
            newStudent.picture = target.files[0];
        } else if (target.name === 'fatherName') {
            newStudent.parents[0].firstName = target.value;
        } else if (target.name === 'fatherMobile') {
            newStudent.parents[0].mobileNumber = target.value;
        } else if (target.name === 'fatherEmail') {
            newStudent.parents[0].email = target.value;
        } else if (target.name === 'fatherOccupation') {
            newStudent.parents[0].occupation = target.value;
        } else if (target.name === 'motherName') {
            newStudent.parents[1].firstName = target.value;
        } else if (target.name === 'motherMobile') {
            newStudent.parents[1].mobileNumber = target.value;
        } else if (target.name === 'motherEmail') {
            newStudent.parents[1].email = target.value;
        } else if (target.name === 'motherOccupation') {
            newStudent.parents[1].occupation = target.value;
        } else newStudent[target.name] = target.value;
        setNewStudent({...newStudent});
    }

    function handleAddStudent(event) {
        event.preventDefault();
        //console.log(fileInput.current.files[0].name);
        newStudent.admissionNumber = editableStudent.admissionNumber;
        const date = new Date();
        newStudent.admissionDate = editableStudentId ? newStudent.admissionDate : date.toISOString();
        newStudent.dateOfBirth = new Date(newStudent.dateOfBirth).toISOString();
        if (!editableStudentId) {
            //newStudent.picture = fileInput.current.files[0].name;
        }
        setNewStudent({...newStudent});


        console.log('newstudent', newStudent);

        let studentDetails = new FormData();
        studentDetails.append('Picture', newStudent.picture);
        studentDetails.append('AdmissionNumber', newStudent.admissionNumber);
        studentDetails.append('FirstName', newStudent.firstName);
        studentDetails.append('LastName', newStudent.lastName);
        studentDetails.append('Gender', newStudent.gender);
        studentDetails.append('DateOfBirth', newStudent.dateOfBirth);
        studentDetails.append('AdmissionDate', newStudent.admissionDate)
        studentDetails.append('Class', newStudent.class);
        studentDetails.append('Section', newStudent.section);
        studentDetails.append('Religion', newStudent.religion);
        studentDetails.append('Address', newStudent.address);
        studentDetails.append('FatherName', newStudent.parents[0].firstName);
        studentDetails.append('FatherMobileNumber', newStudent.parents[0].mobileNumber);
        studentDetails.append('FatherEmail', newStudent.parents[0].email);
        studentDetails.append('FatherOccupation', newStudent.parents[0].occupation);
        studentDetails.append('FatherReligion', newStudent.religion);
        studentDetails.append('MotherName', newStudent.parents[1].firstName);
        studentDetails.append('MotherMobileNumber', newStudent.parents[1].mobileNumber);
        studentDetails.append('MotherEmail', newStudent.parents[1].email);
        studentDetails.append('MotherOccupation', newStudent.parents[1].occupation);
        studentDetails.append('MotherReligion', newStudent.religion);


        async function postStudent() {
            let action;
            if (editableStudentId) {
                await axios.put('http://localhost:8080/v1/api/update-student', studentDetails)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_STUDENT', payload: result.data};
                            console.log('EditStudent')
                            dispatch(action);
                        }
                    })
            } else {
                await axios.post('http://localhost:8080/v1/api/post-student', studentDetails)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_STUDENT', payload: result.data};
                            console.log('AddStudent')
                            dispatch(action);
                        }
                    })
            }
        }

        postStudent();


        setNewStudent({...initialStudent});
        if (editableStudentId) {
            props.history.goBack();
        }
    }


    return (
        <div className='shadow' style={{...closeStyle, backgroundColor: 'white'}}>
            <SectionHeader sTitle={'Admission Form'} toggleCollapse={collapseButton} toggleClose={closeButton}/>
            <div className='px-3' style={collapsableStyle}>
              <Form className='px-2' onSubmit={handleAddStudent}>
                <h3>Student's Information</h3> <br/>
                <Row className='d-flex flex-wrap'>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>First Name</Label>
                    <Input name='firstName' value={newStudent.firstName} placeholder='First Name' onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Last Name</Label>
                    <Input name='lastName' value={newStudent.lastName} placeholder='Last Name' onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Class</Label>
                    <Input type='select' name='class' value={newStudent.class} placeholder='Select Class' onChange={onInputChange}>
                        <option value=' '> </option>
                        {returnClassesArray(classes).map((v,i) => {
                            return <option key={i} value={v}>{v}</option>
                        })}
                    </Input>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Section</Label>
                    <Input type='select' name='section' value={newStudent.section} placeholder='Select Section' onChange={onInputChange}>
                        <option value=' '> </option>
                        {returnSectionArray(classes).map((v,i) => {
                            return <option key={i} value={v}>{v}</option>
                        })}
                    </Input>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Gender</Label>
                    <Input type='select' name='gender' value={newStudent.gender} placeholder='Gender' onChange={onInputChange}>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </Input>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Date Of Birth</Label>
                    <Input type='date' name='dateOfBirth' placeholder='Date Of Birth' onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Admission Number</Label>
                    <Input name='admissionNumber' value={editableStudent.admissionNumber} onChange={onInputChange}
                           disabled/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Religion</Label>
                    <Input name='religion' value={newStudent.religion} placeholder='Religion' onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Upload Student Picture</Label>
                    <Input type='file' name='picture' onChange={onInputChange}/>
                  </FormGroup>
                </Row>
                  <h3>Parent's Information</h3><br/>
                <Row>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Father's Name</Label>
                    <Input name='fatherName' value={newStudent.parents[0].firstName} placeholder="Father's Name" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Father's Mobile</Label>
                    <Input name='fatherMobile' value={newStudent.parents[0].mobileNumber} placeholder="Father's Mobile" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Father's Email</Label>
                    <Input type='email' name='fatherEmail' value={newStudent.parents[0].email} placeholder="Father's Email" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Father's Occupation</Label>
                    <Input name='fatherOccupation' value={newStudent.parents[0].occupation} placeholder="Father's Occupation" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Mother's Name</Label>
                    <Input name='motherName' value={newStudent.parents[1].firstName} placeholder="Mother's Name" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Mother's Mobile</Label>
                    <Input name='motherMobile' value={newStudent.parents[1].mobileNumber} placeholder="Mother's Mobile" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Mother's Email</Label>
                    <Input type='email' name='motherEmail' value={newStudent.parents[1].email} placeholder="Mother's Email" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Mother's Occupation</Label>
                    <Input name='motherOccupation' value={newStudent.parents[1].occupation} placeholder="Mother's Occupation" onChange={onInputChange}/>
                  </FormGroup>
                  <FormGroup className='flex-fill mr-3'>
                    <Label>Address</Label>
                    <Input name='address' type='textarea' value={newStudent.address} placeholder="Address" onChange={onInputChange}/>
                  </FormGroup>
                </Row>

                <Button type='submit'>Save</Button>
              </Form>
            </div>
        </div>


    );
}

export default AddStudent;