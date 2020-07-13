import React, {useContext, useEffect, useState} from 'react';
import SidebarItem from './SidebarItem'
import SideHeader from './SideHeader';
import SidebarItemsArray from '../lib/SidebarItemsArray';
import '../lib/css/sidebar.css'
import {AppContext} from '../contexts/AppContext';


function Sidebar({isOpen, setIsOpen}) {

    const [items, setItems] = useState([]);
    const [barOpen, setBarOpen] = useState(true);
    const [state, dispatch] = useContext(AppContext);
    let teacherItemsArray = [
        {
            id: 1,
            name: 'Dashboard',
            link: ['/dashboard/teacher']
        },
        {
            id: 2,
            name: 'All Students',
            link: ['/students/all-students']
        },

        {
            id: 3,
            name: 'Parents',
            link: ['/parents']
        },

        {
            id: 4,
            name: 'Subject',
            link: ['/subjects/all-subjects']
        },
        {
            id: 5,
            name: 'Attendance',
            link: ['/attendance']
        },
        {
            id: 6,
            name: 'Exam',
            drops: ['Term Result', 'Exam Grades'],
            link: ['/exams/result', '/exams/grades']
        },
        {
            id: 7,
            name: 'Transport',
            link: ['/transport']
        },
        {
            id: 8,
            name: 'Hostel',
            link: ['/hostel']
        },
        {
            id: 9,
            name: 'Notice',
            link: ['/notice']
        },
        {
            id: 10,
            name: 'Profile',
            link: ['/profile']
        }
    ];

    let parentItemsArray = [
        {
            id: 1,
            name: 'Dashboard',
            link: ['/dashboard/parent']
        },
        {
            id: 2,
            name: 'Exam Result',
            link: ['/exams/result']
        },
        {
            id: 3,
            name: 'Notice',
            link: ['/notice']
        },
        {
            id: 4,
            name: 'Profile',
            link: ['/profile']
        }
    ];


    //let items;

    useEffect(() => {
        let p = state.profile;
        console.log('p', p)

        if (p !== undefined && p.details !== undefined && p.role === 'Admin') {
            setItems(SidebarItemsArray)
        } else if (p !== undefined && p.details !== undefined && p.role === 'admin') {
            setItems(SidebarItemsArray)
        } else if (p !== undefined && p.details !== undefined && p.role === 'teacher') {
            setItems(teacherItemsArray);
        } else if (p !== undefined && p.details !== undefined && p.role === 'parent') {
            setItems(parentItemsArray)
        }
    }, [state.profile]);

    let show = "slide show fixed-display";
    let noShow = "col-2 slide fixed-display";


    return (
        <div className={isOpen ? show : noShow}
             style={{backgroundColor: '#265b5f', margin: '0px', padding: '0px'}}>
            {(state.profile !== undefined && state.profile.details !== undefined) ? <div>
                {items.map(e => {
                    return <SidebarItem key={e.id} children={e} barIsOpen={isOpen} setBarIsOpen={setIsOpen}/>
                })}
            </div> : ''}
        </div>
    );
}

export default Sidebar;