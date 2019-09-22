import React, {useContext, useEffect, useState} from 'react';
import SidebarItem from './SidebarItem'
import SideHeader from './SideHeader';
import SidebarItemsArray from '../lib/SidebarItemsArray';
import '../lib/css/sidebar.css'
import {AppContext} from '../contexts/AppContext';


function Sidebar({isOpen}) {

    const [items, setItems] = useState([])
    const [barOpen, setBarOpen] = useState(true)
    const [state, dispatch] = useContext(AppContext)
    let teacherItemsArray = [
        {
            id: 1,
            name: 'Dashboard',
            link: ['/dashboard/teacher']
        },
        {
            id: 2,
            name: 'Students',
            drops: ['All Students', 'Promotion'],
            link: ['/students/all-students', '/students/student-promotion']
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
            name: 'Class Routine',
            link: ['/']
        },
        {
            id: 6,
            name: 'Attendance',
            link: ['/attendance']
        },
        {
            id: 7,
            name: 'Exam',
            drops: ['Exam Schedule', 'Exam Grades'],
            link: ['/', '/exams/grades']
        },
        {
            id: 8,
            name: 'Transport',
            link: ['/transport']
        },
        {
            id: 9,
            name: 'Hostel',
            link: ['/hostel']
        },
        {
            id: 10,
            name: 'Notice',
            link: ['/notice']
        },
        {
            id: 11,
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
            id: 3,
            name: 'Exam',
            drops: ['Exam Schedule', 'Exam Grades'],
            link: ['/', '/exams/grades']
        },
        {
            id: 4,
            name: 'Notice',
            link: ['/notice']
        },
        {
            id: 5,
            name: 'Profile',
            link: ['/profile']
        }
    ];


    //let items;

    useEffect(() => {
        let p = state.profile;
        let isSubscribed = true;

        if (p !== undefined && p.details !== undefined && p.role === 'admin') {
            setItems(SidebarItemsArray)
        } else if (p !== undefined && p.details !== undefined && p.role === 'teacher') {
            setItems(teacherItemsArray)
            console.log('itemT,', items)
        } else if (p !== undefined && p.details !== undefined && p.role === 'parent') {
            setItems(parentItemsArray)
        }
        return () => {
            isSubscribed = false
        }
    }, [state.profile])

    let show = "slide show fixed-display"
    let noShow = "col-2 slide fixed-display"


    return (
        <div className={isOpen ? show : noShow}
             style={{backgroundColor: '#264d73', minHeight: '100%', margin: '0px', padding: '0px'}}>
            <div>
                {items.map(e => {
                    return <SidebarItem key={e.id} children={e}/>
                })}
            </div>
        </div>
    );
}

export default Sidebar;