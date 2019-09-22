import React, {useState, useContext} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import useCollapseState from '../../lib/CollapseState';
import {AppContext} from '../../contexts/AppContext';
import {Redirect} from 'react-router-dom';
import {Col, Row, FormGroup, Form, Label, Input} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import AllBooks from "../library/AllBooks";
import AllClasses from "./AllClasses";


function AddClass(props) {

    const [state, dispatch] = useContext(AppContext);

    const initialClass = {
        teacherName: '',
        classId: '',
        section: '',
        classFee: ''
    }


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    let {classes} = state;

    const [newClass, setNewClass] = useState(initialClass);
    const [editableClassId, setEditableClassId] = useState(false);

    function onClickEdit(x) {
        setEditableClassId(true);
        setNewClass({...x});
    }

    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    }

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    }

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
        newClass.classFee = Number(newClass.classFee)
        setNewClass({...newClass});

        async function postClass() {
            let action;
            if (editableClassId) {
                await axios.put('http://localhost:8080/v1/api/update-class', newClass)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_CLASS', payload: result.data};
                            console.log('EditClass')
                            dispatch(action);
                        }
                    })
            } else {
                await axios.post('http://localhost:8080/v1/api/post-class', JSON.stringify(newClass))
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_CLASS', payload: result.data};
                            console.log('AddCLass')
                            dispatch(action);
                        }
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
                                <Input name='classId' value={newClass.classId} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Section</Label>
                                <Input name='section' value={newClass.section} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Class Fee</Label>
                                <Input name='classFee' value={newClass.classFee} onChange={onInputChange}/>
                            </FormGroup>
                        </Row>
                        <Button type='submit'>Save</Button>
                    </Form>
                </div>
            </div>
          <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
            <AllClasses classes={classes} dispatch={dispatch} onClickEdit={onClickEdit}/>
          </div>
        </div>
    );
}

export default AddClass;