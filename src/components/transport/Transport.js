import React, {useContext, useState} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faDumpster, faEdit, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import useCollapseState from '../../lib/CollapseState';
import {AppContext} from '../../contexts/AppContext';
import {Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import axios from "axios";
import useAxiosConfig from "../../lib/AxiosConfig";
import {Redirect} from 'react-router-dom'
import FormFeedback from "reactstrap/es/FormFeedback";

function AllTransportTable({transport, dispatch, onClickEdit, deleteTransport}) {


    return (
        <div className='flex-fill'
             style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Route Name</th>
                    <th>Vehicle No</th>
                    <th>Driver's Name</th>
                    <th>Driver's License</th>
                    <th>Mobile No</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {transport.sort((a, b) => {
                    return a.routeName - b.routeName
                }).map(tran => {
                    return <tr key={tran.routeName +
                    tran.vehicleNumber + tran.driverLicense}>
                        <td>{tran.routeName}</td>
                        <td>{tran.vehicleNumber}</td>
                        <td>{tran.driverName}</td>
                        <td>{tran.driverLicense}</td>
                        <td>{tran.driverMobile}</td>
                        <td className='flex-fill' style={{minWidth: '80px'}}>
                            <FontAwesomeIcon className='mr-1' icon={faEye} style={{color: 'grey'}}/>
                            <FontAwesomeIcon className='mr-1' icon={faEdit} style={{color: 'green'}}
                                             onClick={() => onClickEdit(tran)}/>
                            <FontAwesomeIcon className='mr-1' icon={faDumpster} style={{color: 'red'}} onClick={() => deleteTransport(tran)}/>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

function AllTransport({transport, dispatch, onClickEdit, deleteTransport}) {

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
                <strong className='align-self-center'>Transport List</strong>
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
                <AllTransportTable transport={transport} dispatch={dispatch} onClickEdit={onClickEdit} deleteTransport={deleteTransport}/>
            </div>

        </div>
    );
}

function Transport(props) {

    const [state, dispatch] = useContext(AppContext);
    let {profile} = state;

    let config = useAxiosConfig();

    let transport = state.transport;

    const initialTransport = {
        routeName: '',
        vehicleNumber: '',
        driverName: '',
        driverLicense: '',
        driverMobile: ''
    };


    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    const [editableTransportId, setEditableTransportId] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({});

    //let editableTransport = initialTransport;


    const [newTransport, setNewTransport] = useState(initialTransport);

    function onClickEdit(x) {
        setEditableTransportId(true);
        setNewTransport({...x});
    }

    async function deleteTransport(x) {
        axios.delete('/v1/api/delete-transport/'+ x.routeName + '/' + x.driverMobile, config)
            .then((response) => {
                if (response.status === 200) {
                    let action = {type: 'DELETE_TRANSPORT', payload: x};
                    console.log('DeleteTransport');
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
        newTransport[target.name] = target.value;
        setNewTransport({...newTransport});
    }

    function handleAddTransport(event) {
        event.preventDefault();

        let errors = validate(newTransport)
        setFieldErrors(errors);
        if (Object.keys(errors).length) return;

        setNewTransport({...newTransport});

        async function postTransport() {
            let action;
            if (editableTransportId) {
                await axios.put('/v1/api/update-transport', JSON.stringify(newTransport), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_TRANSPORT', payload: result.data};
                            console.log('EditTr');
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
                await axios.post('/v1/api/post-transport', JSON.stringify(newTransport), config)
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'ADD_TRANSPORT', payload: result.data};
                            console.log('AddTRA');
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

        postTransport();

        setNewTransport({...initialTransport});
    }

    return (
        <div className='d-flex flex-wrap'>
            {(profile.role === 'Admin' || 'admin') ? <div style={{...closeStyle, backgroundColor: 'white'}} className='shadow flex-fill mr-2 mb-4'>
                <SectionHeader sTitle={'Create New Transport'} toggleCollapse={collapseButton}
                               toggleClose={closeButton}/>
                <div className='px-3' style={{...collapsableStyle}}>
                    <Form className='px-2' onSubmit={handleAddTransport}>
                        <Row className='d-flex flex-wrap'>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Route Name</Label>
                                <Input invalid={fieldErrors.routeName === true} name='routeName' value={newTransport.routeName} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Route Name</FormFeedback>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Vehicle Number</Label>
                                <Input name='vehicleNumber' value={newTransport.vehicleNumber}
                                       onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Driver's Name</Label>
                                <Input name='driverName' value={newTransport.driverName} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Driver's License</Label>
                                <Input name='driverLicense' value={newTransport.driverLicense}
                                       onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Driver's Mobile No</Label>
                                <Input invalid={fieldErrors.driverMobile === true} name='driverMobile' value={newTransport.driverMobile} onChange={onInputChange}/>
                                <FormFeedback invalid>Insert Driver Number</FormFeedback>
                            </FormGroup>
                        </Row>
                        <Button style={{backgroundColor: 'teal'}} type='submit'>Save</Button>
                    </Form>
                </div>
            </div> : <div></div>}
            <div className='flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
                <AllTransport transport={transport} dispatch={dispatch} onClickEdit={onClickEdit} deleteTransport={deleteTransport}/>
            </div>
        </div>
    );
}

export default Transport;

function validate(transport) {
    let errors = {};
    if (!transport.routeName || transport.routeName === '') errors.role = true;
    if (!transport.driverMobile || transport.driverMobile === '') errors.driverMobile = true;

    return errors;
}