import React, {useContext, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label, Row, FormFeedback} from 'reactstrap';
import SectionHeader from '../dashboard/SectionHeader';
import {AppContext} from '../../contexts/AppContext';
import useCollapseState from '../../lib/CollapseState';
import axios from "axios";
import {returnClassesArray, returnSectionArray} from "../../lib/ReturnNeededArray";
import CustomInput from "reactstrap/es/CustomInput";
import InputGroup from "reactstrap/es/InputGroup";
import InputGroupAddon from "reactstrap/es/InputGroupAddon";
import useAxiosConfig from "../../lib/AxiosConfig";


function AddStudent(props) {

    const [state, dispatch] = useContext(AppContext);
    let {students, classes} = state;
    let config = useAxiosConfig();

    //console.log('classes', returnClassesArray(classes));
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
    };

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
        discount: 0,
        parentIsStaff: false,
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

    };

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
    const [fieldErrors, setFieldErrors] = useState({});


    if (editableStudentId && (state.students.length === 0)) {
        return (<Redirect to='/students/add-student'/>)
    }


    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    };

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    };

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
        } else if (target.name === 'staff') {
            newStudent.parentIsStaff = target.checked;
            if (target.checked === false) {
                newStudent.discount = 0;
            }
        } else newStudent[target.name] = target.value;

        //validate(target, fieldErrors, setFieldErrors)
        setNewStudent({...newStudent});
    }

    function handleAddStudent(event) {
        event.preventDefault();
        //console.log(fileInput.current.files[0].name);
        newStudent.admissionNumber = editableStudent.admissionNumber;
        newStudent.discount = Number(newStudent.discount)
        const date = new Date();
        newStudent.admissionDate = editableStudentId ? newStudent.admissionDate : date.toISOString();
        const errors = validate(newStudent);
        setFieldErrors(errors);
        if (Object.keys(errors).length) return;

        if (Object.keys(errors).length === 0) {
            newStudent.dateOfBirth = new Date(newStudent.dateOfBirth).toISOString()
        }
        if (!editableStudentId) {
            //newStudent.picture = fileInput.current.files[0].name;
        }
        setNewStudent({...newStudent});


        let studentDetails = new FormData();
        studentDetails.append('Picture', (editableStudentId) ? editableStudent.picture : newStudent.picture );
        studentDetails.append('AdmissionNumber', newStudent.admissionNumber);
        studentDetails.append('FirstName', newStudent.firstName);
        studentDetails.append('LastName', newStudent.lastName);
        studentDetails.append('Gender', newStudent.gender);
        studentDetails.append('DateOfBirth', newStudent.dateOfBirth);
        studentDetails.append('AdmissionDate', newStudent.admissionDate);
        studentDetails.append('Class', newStudent.class);
        studentDetails.append('Section', newStudent.section);
        studentDetails.append('Religion', newStudent.religion);
        studentDetails.append('Address', newStudent.address);
        studentDetails.append('FatherName', (newStudent.parents[0] !== undefined) ? newStudent.parents[0].firstName : '');
        studentDetails.append('FatherMobileNumber', (newStudent.parents[0] !== undefined) ? newStudent.parents[0].mobileNumber : '');
        studentDetails.append('FatherEmail', (newStudent.parents[0] !== undefined) ? newStudent.parents[0].email : '');
        studentDetails.append('FatherOccupation', (newStudent.parents[0] !== undefined) ? newStudent.parents[0].occupation : '');
        studentDetails.append('FatherReligion', (newStudent.parents[0] !== undefined) ? newStudent.religion : '');
        studentDetails.append('MotherName', (newStudent.parents[1] !== undefined) ? newStudent.parents[1].firstName : '');
        studentDetails.append('MotherMobileNumber', (newStudent.parents[1] !== undefined) ? newStudent.parents[1].mobileNumber : '');
        studentDetails.append('MotherEmail', (newStudent.parents[1] !== undefined) ? newStudent.parents[1].email : '');
        studentDetails.append('MotherOccupation', (newStudent.parents[1] !== undefined) ? newStudent.parents[1].occupation : '');
        studentDetails.append('MotherReligion', (newStudent.parents[1] !== undefined) ? newStudent.religion : '');
        studentDetails.append('ParentIsStaff', newStudent.parentIsStaff);
        studentDetails.append('Discount', newStudent.discount);


        async function postStudent() {
            let action;
            if (editableStudentId) {
                await axios.put('/v1/api/update-student', studentDetails, config)
                    .then(result => {
                        setNewStudent({...initialStudent});
                        if (result.status === 200) {
                            action = {type: 'EDIT_STUDENT', payload: result.data};
                            dispatch(action);
                        } else if (result.status === 401) {
                            return <Redirect to='/login'/>
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return <Redirect to='/login'/>
                    })
            } else {
                await axios.post('/v1/api/post-student', studentDetails, config)
                    .then(result => {
                        setNewStudent({...initialStudent});
                        if (result.status === 200) {
                            action = {type: 'ADD_STUDENT', payload: result.data};
                            dispatch(action);
                        } else if (result.status === 401) {
                            return <Redirect to='/login'/>
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return <Redirect to='/login'/>
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
                            <Input
                                invalid={fieldErrors.firstName === true}
                                name='firstName'
                                value={newStudent.firstName} placeholder='First Name' onChange={onInputChange}/>
                            <FormFeedback valid>Good</FormFeedback>
                            <FormFeedback invalid>Must Not Be Empty</FormFeedback>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Last Name</Label>
                            <Input
                                invalid={fieldErrors.lastName === true}
                                name='lastName' value={newStudent.lastName} placeholder='Last Name'
                                onChange={onInputChange}/>
                            <FormFeedback valid>Good</FormFeedback>
                            <FormFeedback invalid>Must Not Be Empty</FormFeedback>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Class</Label>
                            <Input invalid={fieldErrors.class === true} type='select' name='class'
                                   value={newStudent.class} placeholder='Select Class'
                                   onChange={onInputChange}>
                                <option value=' '> </option>
                                {returnClassesArray(classes).map((v, i) => {
                                    return <option key={i} value={v}>{v}</option>
                                })}
                            </Input>
                            <FormFeedback invalid>Select A Class</FormFeedback>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Section</Label>
                            <Input type='select' name='section' value={newStudent.section} placeholder='Select Section'
                                   onChange={onInputChange}>
                                <option value=' '></option>
                                {returnSectionArray(classes).map((v, i) => {
                                    return <option key={i} value={v}>{v}</option>
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Gender</Label>
                            <Input type='select' name='gender' value={newStudent.gender} placeholder='Gender'
                                   onChange={onInputChange}>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Date Of Birth</Label>
                            <Input type='date' invalid={fieldErrors.dateOfBirth === true} name='dateOfBirth'
                                   placeholder='Date Of Birth' onChange={onInputChange}/>
                            <FormFeedback invalid>Select Date</FormFeedback>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Admission Number</Label>
                            <Input name='admissionNumber' value={editableStudent.admissionNumber}
                                   onChange={onInputChange}
                                   disabled/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Religion</Label>
                            <Input name='religion' value={newStudent.religion} placeholder='Religion'
                                   onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Upload Student Picture</Label>
                            <Input
                                invalid={fieldErrors.picture === true}
                                type='file' name='picture' onChange={onInputChange}/>
                            <FormFeedback valid>Good</FormFeedback>
                            <FormFeedback invalid>Insert Picture</FormFeedback>
                        </FormGroup>
                    </Row>
                    <h3>Parent's Information</h3><br/>
                    <Row>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Father's Name</Label>
                            <Input name='fatherName' value={newStudent.parents[0].firstName} placeholder="Father's Name"
                                   onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Father's Mobile</Label>
                            <Input invalid={fieldErrors.fatherMobile === true}
                                   name='fatherMobile' value={(newStudent.parents[0] !== undefined) ? newStudent.parents[0].mobileNumber : ''}
                                   placeholder="Father's Mobile" onChange={onInputChange}/>
                            <FormFeedback invalid='Insert at least one Parent'/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Father's Email</Label>
                            <Input invalid={fieldErrors.fatherEmail === true} type='email' name='fatherEmail'
                                   value={(newStudent.parents[0] !== undefined) ? newStudent.parents[0].email : ''}
                                   placeholder="Father's Email" onChange={onInputChange}/>
                            <FormFeedback invalid='Insert at least one Parent'/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Father's Occupation</Label>
                            <Input name='fatherOccupation' value={(newStudent.parents[0] !== undefined) ? newStudent.parents[0].occupation : ''}
                                   placeholder="Father's Occupation" onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Mother's Name</Label>
                            <Input name='motherName' value={(newStudent.parents[1] !== undefined) ? newStudent.parents[1].firstName : ''} placeholder="Mother's Name"
                                   onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Mother's Mobile</Label>
                            <Input name='motherMobile' value={(newStudent.parents[1] !== undefined) ? newStudent.parents[1].mobileNumber : ''}
                                   placeholder="Mother's Mobile" onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Mother's Email</Label>
                            <Input type='email' name='motherEmail' value={(newStudent.parents[1] !== undefined) ? newStudent.parents[1].email : ''}
                                   placeholder="Mother's Email" onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Mother's Occupation</Label>
                            <Input name='motherOccupation' value={(newStudent.parents[1] !== undefined) ? newStudent.parents[1].occupation : ''}
                                   placeholder="Mother's Occupation" onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup className='flex-fill mr-3'>
                            <Label>Address</Label>
                            <Input name='address' type='textarea' maxLength={200} value={newStudent.address} placeholder="Address"
                                   onChange={onInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Discount</Label>
                            <InputGroup>
                                <InputGroupAddon addonType='append'>%</InputGroupAddon>
                                <Input invalid={fieldErrors.discount} name='discount' placeholder='Discount' value={newStudent.discount} onChange={onInputChange}/>
                            </InputGroup>
                            <FormFeedback invalid>Insert A Number For Discount</FormFeedback>
                        </FormGroup>
                        <Row className='flex-fill m-3 '>
                            <CustomInput id='staff' checked={newStudent.parentIsStaff} type='switch' name='staff'
                                         label='Is Parent A Staff?' onChange={onInputChange}/>
                        </Row>

                    </Row>

                    <Button type='submit' style={{backgroundColor: 'teal'}}>Save</Button>
                </Form>
            </div>
        </div>


    );
}

export default AddStudent;

let validate = (student) => {
    let errors = {};
    //const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!student.firstName || student.firstName === '') errors.firstName = true;
    if (!student.lastName || student.lastName === '') errors.lastName = true;
    if (!student.picture || student.picture === '' || student.picture.size === 0) errors.picture = true;
    if (!student.dateOfBirth || student.dateOfBirth === '') errors.dateOfBirth = true;
    if (!student.class || student.class === '') errors.class = true;
    if (!student.parents[0].mobileNumber && !student.parents[1].mobileNumber) errors.fatherMobile = true;
    if (!student.parents[0].email && !student.parents[1].email) errors.fatherEmail = true;
    if (!student.parents[0].firstName && !student.parents[1].firstName) errors.fatherName = true;
    if(isNaN(student.discount)) errors.discount = true;

    return errors;

};