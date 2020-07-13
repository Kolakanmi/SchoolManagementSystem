import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import useCollapseState from '../../lib/CollapseState';
import {AppContext} from '../../contexts/AppContext';
import {Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import AllClasses from "./AllClasses";
import FormFeedback from "reactstrap/es/FormFeedback";
import {Redirect} from 'react-router-dom'


function AddClass() {

    const [state, dispatch] = useContext(AppContext);

    const initialClass = {
        teacherName: '',
        classId: '',
        section: '',
        classFee: 0,
        order: 1,
        uploadDate: ''
    };


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    let {classes, profile} = state;

    const [newClass, setNewClass] = useState(initialClass);
    const [editableClassId, setEditableClassId] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    function onClickEdit(x) {
        setEditableClassId(true);
        setNewClass({...x});
    }

        async function deleteClass(x) {
            axios.delete('/v1/api/delete-class/'+ x.classId + '/' + x.section, config)
                .then((response) => {
                    if (response.status === 200) {
                        let action = {type: 'DELETE_CLASS', payload: x};
                        console.log('DeleteParent');
                        dispatch(action);
                    }
                })
        }

    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    };

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    };

    let config = {
        headers: {
            'Authorization': profile.token
        }
    };

    function onInputChange(e) {
        const target = e.target;
        newClass[target.name] = target.value;
        setNewClass({...newClass});
    }

    function handleAddClass(event) {
        event.preventDefault();
        //console.log(fileInput.current.files[0].name);
        /* newClass.bookId = editableClass.bookId || newClass.subject + newClass.class;
        const date = new Date();
        newClass.uploadDate = editableClassId ? newClass.uploadDate : date.toUTCString();
        console.log(newClass.bookId); */
        newClass.classFee = Number(newClass.classFee);
        newClass.order = Number(newClass.order);
        let errors = validate(newClass);
        setFieldErrors(errors);

        if (Object.keys(errors).length) return;

        setNewClass({...newClass});

        async function postClass() {
            let action;
            if (editableClassId) {
                await axios.put('/v1/api/update-class', JSON.stringify(newClass), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_CLASS', payload: result.data};
                            console.log('EditClass');
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
                await axios.post('/v1/api/post-class', JSON.stringify(newClass), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_CLASS', payload: result.data};
                            console.log('AddClass');
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

        postClass();

        setNewClass({...initialClass});
    }

    return (
        <div className='d-flex flex-wrap'>
            <div className='shadow' style={{...closeStyle, backgroundColor: 'white'}}>
                <SectionHeader sTitle={'Add Class'} toggleCollapse={collapseButton} toggleClose={closeButton}/>
                <div className='px-3' style={collapsableStyle}>
                    <Form className='px-2' onSubmit={handleAddClass}>
                        <Row className='d-flex flex-wrap'>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Teacher's Name</Label>
                                <Input name='teacherName' value={newClass.teacherName} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Class</Label>
                                <Input invalid={fieldErrors.classId === true} name='classId' value={newClass.classId} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Class</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Section</Label>
                                <Input invalid={fieldErrors.section === true} maxLength={1} name='section' value={newClass.section} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Section</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Class Fee</Label>
                                <Input invalid={fieldErrors.classFee === true} name='classFee' value={newClass.classFee} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Class Fee As A Number</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Class Order</Label>
                                <Input invalid={fieldErrors.order === true} name='order' value={newClass.order} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Class Order As A Number</FormFeedback>
                            </FormGroup>
                        </Row>
                        <Button style={{backgroundColor: 'teal'}} type='submit'>Save</Button>
                    </Form>
                </div>
            </div>
          <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
            <AllClasses classes={classes} dispatch={dispatch} onClickEdit={onClickEdit} deleteClass={deleteClass}/>
          </div>
        </div>
    );
}

export default AddClass;

function validate(clas) {
    let errors = {};
    if (!clas.classId || clas.classId === '') errors.classId = true;
    if (!clas.section || clas.section === '' || clas.section.length > 1) errors.section = true;
    if(isNaN(clas.classFee)) errors.classFee = true;
    if(isNaN(clas.order)) errors.order = true;

    return errors;
}