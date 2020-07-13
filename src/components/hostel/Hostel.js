import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faDumpster, faEdit, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import useCollapseState from '../../lib/CollapseState';
import {AppContext} from '../../contexts/AppContext';
import {Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import FormFeedback from "reactstrap/es/FormFeedback";
import useAxiosConfig from "../../lib/AxiosConfig";
import {Redirect} from 'react-router-dom'


function AllHostelTable({hostel, dispatch, onClickEdit, deleteHostel}) {

    return (
        <div className='flex-fill'
             style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Hostel Name</th>
                    <th>Room No</th>
                    <th>Number of Beds In Room</th>
                    <th>Cost per Bed</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {hostel.sort((a, b) => {
                    return a.id - b.id
                }).map(host => {
                    return <tr key={host.id}>
                        <td>{host.name}</td>
                        <td>{host.roomNumber}</td>
                        <td>{host.numberOfBedsInRoom}</td>
                        <td>{host.costOfBed}</td>
                        <td className='flex-fill' style={{minWidth: '80px'}}>
                            <FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/>
                            <FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}
                                             onClick={() => onClickEdit(host)}/>
                            <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}} onClick={() => deleteHostel(host)}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

function AllHostel({hostel, dispatch, onClickEdit, deleteHostel}) {

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
                <strong className='align-self-center'>Hostel Room List</strong>
                {/*<div className='d-flex align-items-center mx-2 my-sm-2 m-auto'>
                    <input className='form-control form-control-sm mr-1'/>
                    <input className='form-control form-control-sm mr-1'/>
                    <button className='form-control form-control-sm'
                            style={{backgroundColor: '#264d73', color: 'white', maxWidth: '60px'}}>Search
                    </button>
                </div>*/}
                <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>

            </div>
            <hr style={{margin: '0px', backgroundColor: 'black'}}/>
            <div style={{...collapsableStyle, overflowX: 'auto'}}>
                <AllHostelTable hostel={hostel} dispatch={dispatch} onClickEdit={onClickEdit} deleteHostel={deleteHostel}/>
            </div>

        </div>
    );
}

function Hostel() {

    const [state, dispatch] = useContext(AppContext);

    let {profile} = state;

    let hostel = state.hostels;

    let config = useAxiosConfig();

    const initialHostel = {
        name: '',
        roomNumber: '',
        numberOfBedsInRoom: 1,
        costOfBed: 1,
    };


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    const [editableHostelId, setEditableHostelId] = useState(false);


    //let editableHostel = initialHostel;


    const [newHostel, setNewHostel] = useState(initialHostel);
    const [fieldErrors, setFieldErrors] = useState({});
    function onClickEdit(x) {
        setEditableHostelId(true);
        setNewHostel({...x});
    }

    async function deleteHostel(x) {
        axios.delete('/v1/api/delete-hostel/'+ x.name + '/' + x.roomNumber, config)
            .then((response) => {
                if (response.status === 200) {
                    let action = {type: 'DELETE_HOSTEL', payload: x};
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

    function onInputChange(e) {
        const target = e.target;
        newHostel[target.name] = target.value;
        setNewHostel({...newHostel});
    }

    function handleAddHostel(event) {
        event.preventDefault();

        /* const date = new Date();
         newHostel.id = editableHostelId ? newHostel.id : date.toUTCString();*/
        newHostel.numberOfBedsInRoom = Number(newHostel.numberOfBedsInRoom);
        newHostel.costOfBed = Number(newHostel.costOfBed);
        let error = validate(newHostel);
        setFieldErrors(error);
        if (Object.keys(error).length) return;
        setNewHostel({...newHostel});



        async function postHostel() {
            let action;
            if (editableHostelId) {
                await axios.put('/v1/api/update-hostel', JSON.stringify(newHostel), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_HOSTEL', payload: result.data};
                            console.log('EditHos');
                            dispatch(action);
                        }
                    })
            } else {
                await axios.post('/v1/api/post-hostel', JSON.stringify(newHostel), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_HOSTEL', payload: result.data};
                            console.log('Addhostel');
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

        postHostel();
        setNewHostel({...initialHostel});

    }

    return (
        <div className='d-flex flex-wrap'>
            {(profile.role === 'Admin' || 'admin') ?  <div style={{...closeStyle, backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
                <SectionHeader sTitle={'Add New Room'} toggleCollapse={collapseButton} toggleClose={closeButton}/>
                <div className='px-3' style={{...collapsableStyle}}>
                    <Form className='px-2' onSubmit={handleAddHostel}>
                        <Row className='d-flex flex-wrap flex-column'>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Hostel Name</Label>
                                <Input invalid={fieldErrors.name === true} name='name' value={newHostel.name} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Hostel Name</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Room Number</Label>
                                <Input name='roomNumber' value={newHostel.roomNumber} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Number Of Beds In Room</Label>
                                <Input invalid={fieldErrors.numberOfBedsInRoom === true} name='numberOfBedsInRoom' value={newHostel.numberOfBedsInRoom}
                                       onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Number Of Beds As A Number</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Cost Per Bed</Label>
                                <Input invalid={fieldErrors.costOfBed === true} name='costOfBed' value={newHostel.costOfBed} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Cost Of Bed As A Number</FormFeedback>
                            </FormGroup>
                        </Row>
                        <Button style={{backgroundColor: 'teal'}} type='submit'>Save</Button>
                    </Form>
                </div>
            </div> : <div></div>}
            <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
                <AllHostel hostel={hostel} dispatch={dispatch} onClickEdit={onClickEdit} deleteHostel={deleteHostel}/>
            </div>
        </div>
    );
}

export default Hostel;

function validate(search) {
    let error = {};
    if (!search.name || search.name === '') error.name = true
    if (isNaN(search.numberOfBedsInRoom)) error.numberOfBedsInRoom = true;
    if (isNaN(search.costOfBed)) error.costOfBed = true;

    return error
}