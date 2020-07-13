import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faBars, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {AppContext} from '../contexts/AppContext';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import fakeAuth from "../lib/Auth";

function TopHeader(props) {

    let [state, dispatch] = useContext(AppContext);
    let {profile} = state;
    let {isOpen, setIsOpen} = props;
    const [updater, setUpdater] = useState(false);

    //let profile = state.profile;
    useEffect(() => {

        let isSubscribed = true;
        let config = {
            headers: {
                'Authorization': profile.token
            }
        };

        async function fetchStudentAndParentData() {
            let result = await axios.get('/v1/api/get-all-students', config);
            let parent = await axios.get('/v1/api/get-all-parents', config);
            console.log('s', result.data);
            console.log('p', parent.data);
            dispatch({type: 'FETCH_INIT_STUDENTS', payload: result.data});
            dispatch({type: 'FETCH_INIT_PARENTS', payload: parent.data})
        }

        async function fetchGradesForParentAlone() {
            let grades = await axios.get('/v1/api/get-grades-by-parentId/'+profile.details.parentId, config)
            let notice = await axios.get('/v1/api/get-all-notice', config);
            dispatch({type: 'FETCH_INIT_GRADES', payload: grades.data})
            dispatch({type: 'FETCH_INIT_NOTICE', payload: notice.data});
        }


        async function fetchTeacherData() {
            await axios.get('/v1/api/get-all-teachers', config).then(result => {
                dispatch({type: 'FETCH_INIT_TEACHERS', payload: result.data});
            });

        }

        async function fetchAllForAdmin() {
            let hostel = await axios.get('/v1/api/get-all-hostels', config);
            let library = await axios.get('/v1/api/get-all-books', config);
            let transport = await axios.get('/v1/api/get-all-transport', config);
            let fees = await axios.get('/v1/api/get-all-fees', config);
            let expenses = await axios.get('/v1/api/get-all-expenses', config)
            dispatch({type: 'FETCH_INIT_HOSTELS', payload: hostel.data});
            dispatch({type: 'FETCH_INIT_BOOKS', payload: library.data});
            dispatch({type: 'FETCH_INIT_TRANSPORTS', payload: transport.data});
            dispatch({type: 'FETCH_INIT_FEES', payload: fees.data})
            dispatch({type: 'FETCH_INIT_EXPENSES', payload: expenses.data})

        }

        async function fetchForTeacher() {
            let attendance = await axios.get('/v1/api/get-all-attendance', config);
            let classes = await axios.get('/v1/api/get-all-classes', config);
            let notice = await axios.get('/v1/api/get-all-notice', config);
            let subjects = await axios.get('/v1/api/get-all-subjects', config);
            let grade = await axios.get('/v1/api/get-all-grades', config);
            dispatch({type: 'FETCH_INIT_ATTENDANCE', payload: attendance.data});
            dispatch({type: 'FETCH_INIT_CLASS', payload: classes.data});
            dispatch({type: 'FETCH_INIT_NOTICE', payload: notice.data});
            dispatch({type: 'FETCH_INIT_SUBJECTS', payload: subjects.data});
            dispatch({type: 'FETCH_INIT_GRADES', payload: grade.data});
        }

        if (state.profile !== undefined && state.profile.details !== undefined && (state.profile.role === "Admin" || "admin" || "teacher")) {
            fetchStudentAndParentData();
            fetchForTeacher();
        }
        if (state.profile !== undefined && state.profile.details !== undefined && (state.profile.role === "Admin" || "admin")) {
            fetchTeacherData();
            //fetchForTeacher();
            fetchAllForAdmin();
        }
        if (state.profile !== undefined && state.profile.details !== undefined && (state.profile.role === "parent")) {
            fetchGradesForParentAlone();
        }
        //fetchStudentData()
        //fetchTeacherData()
        return () => {
        }
    }, []);

    if (updater === true) {
        return  <Redirect to='/login'/>
    }

    //console.log(state.profile)
    function signOut() {
        fakeAuth.signout(() => {
            console.log(fakeAuth.isAuthenticated);
            setUpdater(!updater)
        })
        //state.profile = {};
    }
    return (
        <div className='px-1 d-flex align-items-center' style={{backgroundColor: 'white', height: '50px', maxHeight: '70px',}}>
            <span className='d-flex d-md-none mr-3'><FontAwesomeIcon size='lg' style={{color: '#265b5f'}} icon={faBars}
                                                                     onClick={() => {
                                                                         setIsOpen(!isOpen);
                                                                         console.log(isOpen)
                                                                     }}/></span>
            <span className='flex-fill mx-2'><strong>Welcome To ELIS School Management System</strong></span>
            <div className='d-flex align-items-center ml-auto' style={{margin: '0px'}}>
                <span className='mr-2'><FontAwesomeIcon icon={faUser}/></span>
                <div className='flex-column' style={{height: '100%'}}>
                    <p style={{margin: '0px', padding: '0px'}}>{profile.details.lastName}</p>
                    <p style={{margin: '0px', padding: '0px'}}>{profile.role}</p>
                </div>
                <span className='ml-2'><FontAwesomeIcon icon={faSignOutAlt} size={'md'} color={'red'} onClick={signOut} /> </span>
            </div>

        </div>
    );
}

export default TopHeader;