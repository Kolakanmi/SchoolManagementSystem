import React, {useState, useEffect, useContext} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faAngleDown, faTimes, faEye, faEdit, faDumpster} from '@fortawesome/free-solid-svg-icons';
import useCollapseState from '../../lib/CollapseState';
import {AppContext} from '../../contexts/AppContext';
import {Redirect} from 'react-router-dom';
import {Col, Row, FormGroup, Form, Label, Input} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";


function AllHostelTable({hostel, dispatch, onClickEdit}) {

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
                            <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

function AllHostel({hostel, dispatch, onClickEdit}) {

    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    }

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    }

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
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>

            </div>
            <hr style={{margin: '0px', backgroundColor: 'black'}}/>
            <div style={{...collapsableStyle, overflowX: 'auto'}}>
                <AllHostelTable hostel={hostel} dispatch={dispatch} onClickEdit={onClickEdit}/>
            </div>

        </div>
    );
}

function Hostel(props) {

    const [state, dispatch] = useContext(AppContext);

    let {profile} = state;

    let hostel = state.hostels;

    const initialHostel = {
        name: '',
        roomNumber: '',
        numberOfBedsInRoom: 0,
        costOfBed: 0,
    }


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    const [editableHostelId, setEditableHostelId] = useState(false);


    //let editableHostel = initialHostel;


    const [newHostel, setNewHostel] = useState(initialHostel);

    function onClickEdit(x) {
        setEditableHostelId(true);
        setNewHostel({...x});
    }

    useEffect(() => {

    })


    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    }

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    }

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
        setNewHostel({...newHostel});

        async function postHostel() {
            let action;
            if (editableHostelId) {
                await axios.put('http://localhost:8080/v1/api/update-hostel', newHostel)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_HOSTEL', payload: result.data};
                            console.log('EditHos')
                            dispatch(action);
                        }
                    })
            } else {
                await axios.post('http://localhost:8080/v1/api/post-hostel', JSON.stringify(newHostel))
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_HOSTEL', payload: result.data};
                            console.log('Addhostel')
                            dispatch(action);
                        }
                    })
            }
        }

        postHostel();
        setNewHostel({...initialHostel});

    }

    return (
        <div className='d-flex flex-wrap'>
            {(profile.role === 'admin') ?  <div style={{...closeStyle, backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
                <SectionHeader sTitle={'Add New Room'} toggleCollapse={collapseButton} toggleClose={closeButton}/>
                <div className='px-3' style={{...collapsableStyle}}>
                    <Form className='px-2' onSubmit={handleAddHostel}>
                        <Row className='d-flex flex-wrap flex-column'>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Hostel Name</Label>
                                <Input name='name' value={newHostel.name} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Room Number</Label>
                                <Input name='roomNumber' value={newHostel.roomNumber} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Number Of Beds In Room</Label>
                                <Input name='numberOfBedsInRoom' value={newHostel.numberOfBedsInRoom}
                                       onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Cost Per Bed</Label>
                                <Input name='costOfBed' value={newHostel.costOfBed} onChange={onInputChange}/>
                            </FormGroup>
                        </Row>
                        <Button type='submit'>Save</Button>
                    </Form>
                </div>
            </div> : <div></div>}
            <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
                <AllHostel hostel={hostel} dispatch={dispatch} onClickEdit={onClickEdit}/>
            </div>
        </div>
    );
}

export default Hostel;