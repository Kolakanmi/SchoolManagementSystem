import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faDumpster, faEdit, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import useCollapseState from '../../lib/CollapseState';
import {AppContext} from '../../contexts/AppContext';
import {Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import {returnClassesArray} from "../../lib/ReturnNeededArray";
import FormFeedback from "reactstrap/es/FormFeedback";
import useAxiosConfig from "../../lib/AxiosConfig";
import {Redirect} from 'react-router-dom'


function AllSubjectsTable({subjects, dispatch, onClickEdit, deleteSubject}) {

    return (
        <div className='flex-fill'
             style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Subject Name</th>
                    <th>Subject Code</th>
                    <th>Class</th>
                    <th>Periods Per Week</th>
                    <th>Teacher</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {subjects.sort((a, b) => {
                    return a.title - b.title
                }).map(sub => {
                    return <tr key={sub.subjectCode + sub.class}>
                        <td>{sub.title}</td>
                        <td>{sub.subjectCode}</td>
                        <td>{sub.class}</td>
                        <td>{sub.periods}</td>
                        <td>{sub.teacherName}</td>
                        <td className='flex-fill' style={{minWidth: '80px'}}>
                            <FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/>
                            <FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}
                                             onClick={() => onClickEdit(sub)}/>
                            <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}} onClick={() => deleteSubject(sub)}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

function AllSubjects({subjects, dispatch, onClickEdit, deleteSubject}) {

    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    };

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    };


    return (
        <div className='flex-column flex-fill px-2 shadow'
             style={{...closeStyle, backgroundColor: 'white', width: '100%', overflowX: 'auto'}}>
            <div className='d-flex'>
                <strong className='align-self-center'>All Subjects</strong>
                <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>

            </div>
            <hr style={{margin: '0px', backgroundColor: 'black'}}/>
            <div style={{...collapsableStyle, overflowX: 'auto'}}>
                <AllSubjectsTable subjects={subjects} dispatch={dispatch} onClickEdit={onClickEdit} deleteSubject={deleteSubject}/>
            </div>

        </div>
    );
}

function Subjects() {

    const [state, dispatch] = useContext(AppContext);

    let {subjects, classes, profile} = state;

    let config = useAxiosConfig();

    const initialSubject = {
        title: '',
        class: '',
        subjectCode: '',
        periods: 0,
        teacherName: '',
    };


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    const [editableSubjectId, setEditableSubjectId] = useState(false);

    const [newSubject, setNewSubject] = useState(initialSubject);

    const [fieldErrors, setFieldErrors] = useState({});


    function onClickEdit(x) {
        setEditableSubjectId(true);
        setNewSubject({...x});
    }

    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    };

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    };

    function onInputChange(e) {
        const target = e.target;
        newSubject[target.name] = target.value;
        setNewSubject({...newSubject});
    }

    async function deleteSubject(x) {
        axios.delete('/v1/api/delete-subject/'+ x.title + '/' + x.class, config)
            .then((response) => {
                if (response.status === 200) {
                    let action = {type: 'DELETE_SUBJECT', payload: x};
                    console.log('DeleteSubject');
                    dispatch(action);
                }
            })
    }

    function handleAddSubject(event) {
        event.preventDefault();

        newSubject.periods = Number(newSubject.periods);
        let errors = validate(newSubject);
        setFieldErrors(errors);

        if (Object.keys(errors).length) return;

        setNewSubject({...newSubject});
        console.log(newSubject);

        async function postSubject() {
            let action;
            if (editableSubjectId) {
                await axios.put('/v1/api/update-subject', JSON.stringify(newSubject), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_SUBJECT', payload: result.data};
                            console.log('EditSubject');
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
                await axios.post('/v1/api/post-subject', JSON.stringify(newSubject), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_SUBJECT', payload: result.data};
                            console.log('AddSubject');
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

        postSubject();
        setNewSubject({...initialSubject});
    }

    return (
        <div className='d-flex flex-wrap'>
            {(profile.role === 'Admin' || 'admin') ?
                <div style={{...closeStyle, backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
                    <SectionHeader sTitle={'Create New Subject'} toggleCollapse={collapseButton}
                                   toggleClose={closeButton}/>
                    <div className='px-3' style={{...collapsableStyle}}>
                        <Form className='px-2' onSubmit={handleAddSubject}>
                            <Row className='d-flex flex-wrap'>
                                <FormGroup className='flex-fill mr-3'>
                                    <Label>Subject Title</Label>
                                    <Input invalid={fieldErrors.title === true} name='title' value={newSubject.title} onChange={onInputChange}/>
                                  <FormFeedback invalid>Insert Title</FormFeedback>
                                </FormGroup>
                                <FormGroup className='flex-fill mr-3'>
                                    <Label>Subject Code</Label>
                                    <Input name='subjectCode' value={newSubject.subjectCode} onChange={onInputChange}/>
                                </FormGroup>
                                <FormGroup className='flex-fill mr-3'>
                                    <Label>Select Class</Label>
                                    <Input invalid={fieldErrors.class === true} type='select' name='class' value={newSubject.class} onChange={onInputChange}>
                                        <option value=' '> </option>
                                        {returnClassesArray(classes).map((v, i) => {
                                            return <option key={i} value={v}>{v}</option>
                                        })}
                                    </Input>
                                    <FormFeedback invalid>Pick A Class</FormFeedback>
                                </FormGroup>
                                <FormGroup className='flex-fill mr-3'>
                                    <Label>Periods per Week</Label>
                                    <Input invalid={fieldErrors.periods === true} name='periods'
                                           value={newSubject.periods} onChange={onInputChange}/>
                                    <FormFeedback invalid>Insert Number Of Periods As A Number</FormFeedback>
                                </FormGroup>
                                <FormGroup className='flex-fill mr-3'>
                                    <Label>Teacher</Label>
                                    <Input name='teacherName' value={newSubject.teacherName} onChange={onInputChange}/>
                                </FormGroup>
                            </Row>
                            <Button style={{backgroundColor: 'teal'}} type='submit'>Save</Button>
                        </Form>
                    </div>
                </div> : <div></div>}
            <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
                <AllSubjects subjects={subjects} dispatch={dispatch} onClickEdit={onClickEdit} deleteSubject={deleteSubject}/>
            </div>
        </div>
    );
}

export default Subjects;

function validate(subject) {
    let errors = {};
    if (!subject.title || subject.title === '') errors.title = true;
    if (!subject.class || subject.class === '') errors.class = true;
    if (isNaN(subject.periods)) errors.periods = true;

    return errors;
}