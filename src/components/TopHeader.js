import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faBell, faEnvelope, faUser, faBars, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {AppContext} from '../contexts/AppContext';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import fakeAuth from "../lib/Auth";

function TopHeader(props) {

    let [state, dispatch] = useContext(AppContext);
    let {profile} = state;
    let {isOpen, setIsOpen} = props;
    const [updater, setUpdater] = useState(false)

    //let profile = state.profile;
    useEffect(() => {

        let isSubscribed = true;
        let config = {
            headers: {
                //'Origin': 'http://localhost:8080/get-all-students',
                'Authorization': profile.token
            }
        }

        async function fetchStudentAndParentData() {
            let result = await axios.get('http://localhost:8080/v1/api/get-all-students');
            let parent = await axios.get('http://localhost:8080/v1/api/get-all-parents');
            console.log('s', result.data);
            console.log('p', parent.data);
            dispatch({type: 'FETCH_INIT_STUDENTS', payload: result.data});
            dispatch({type: 'FETCH_INIT_PARENTS', payload: parent.data})
        }


        async function fetchTeacherData() {
            await axios.get('http://localhost:8080/v1/api/get-all-teachers').then(result => {
                dispatch({type: 'FETCH_INIT_TEACHERS', payload: result.data});
            });

        }

        async function fetchAllForAdmin() {
            let attendance = await axios.get('http://localhost:8080/v1/api/get-all-attendance');
            let classes = await axios.get('http://localhost:8080/v1/api/get-all-classes');
            let hostel = await axios.get('http://localhost:8080/v1/api/get-all-hostels');
            let library = await axios.get('http://localhost:8080/v1/api/get-all-books');
            let notice = await axios.get('http://localhost:8080/v1/api/get-all-notice');
            let subjects = await axios.get('http://localhost:8080/v1/api/get-all-subjects');
            let transport = await axios.get('http://localhost:8080/v1/api/get-all-transport');
            dispatch({type: 'FETCH_INIT_ATTENDANCE', payload: attendance.data});
            dispatch({type: 'FETCH_INIT_CLASS', payload: classes.data})
            dispatch({type: 'FETCH_INIT_HOSTELS', payload: hostel.data});
            dispatch({type: 'FETCH_INIT_BOOKS', payload: library.data})
            dispatch({type: 'FETCH_INIT_NOTICE', payload: notice.data});
            dispatch({type: 'FETCH_INIT_SUBJECTS', payload: subjects.data})
            dispatch({type: 'FETCH_INIT_TRANSPORTS', payload: transport.data});

        }

        if (state.profile !== undefined && state.profile.details !== undefined && (state.profile.role === "admin" || "teacher")) {
            fetchStudentAndParentData()
        }
        if (state.profile !== undefined && state.profile.details !== undefined && state.profile.role === "admin") {
            fetchTeacherData()
            fetchAllForAdmin()
        }
        //fetchStudentData()
        //fetchTeacherData()
        return () => {
        }
    }, [])

    if (updater === true) {
        return  <Redirect to='/login'/>
    }

    //console.log(state.profile)
    function signOut() {
        fakeAuth.signout(() => {
            console.log(fakeAuth.isAuthenticated)
            setUpdater(!updater)
        })
        //state.profile = {};
    }
    return (
        <div className='px-1 d-flex align-items-center' style={{backgroundColor: 'white', maxHeight: '70px',}}>
            <span className='d-flex d-md-none mr-2'><FontAwesomeIcon style={{color: 'blue'}} icon={faBars}
                                                                     onClick={() => {
                                                                         setIsOpen(!isOpen);
                                                                         console.log(isOpen)
                                                                     }}/></span>
            <span className='flex-fill'><strong>Welcome To ELIS School Management System</strong></span>
            <div className='d-flex align-items-center ml-auto' style={{margin: '0px'}}>
                <span><FontAwesomeIcon icon={faUser}/></span>
                <div className='flex-column' style={{height: '100%', border: '2px solid blue'}}>
                    <p style={{margin: '0px', padding: '0px'}}>{profile.details.lastName}</p>
                    <p style={{margin: '0px', padding: '0px'}}>{profile.role}</p>
                </div>
                <span><FontAwesomeIcon icon={faSignOutAlt} size={'sm'} color={'red'} onClick={signOut} /> </span>
            </div>

        </div>
    );
}

export default TopHeader;