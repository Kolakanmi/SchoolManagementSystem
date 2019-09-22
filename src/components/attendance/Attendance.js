import React, {useContext, useState, useEffect} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import useCollapseState from "../../lib/CollapseState";
import {Form, Row, FormGroup, Label, Input, Button} from "reactstrap";
import {AppContext} from "../../contexts/AppContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faTimes, faAngleDown, faSync} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {returnClassesArray, returnSectionArray} from "../../lib/ReturnNeededArray";


function AttendanceCheckout({attendanceSearch, setAttendanceSearch}) {

    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState()
    const [state] = useContext(AppContext)
    const [searchParams, setSearchParams] = useState(attendanceSearch);
    let {classes} = state;
    const collapsableStyle = {
        display: isCollapse ? 'none' : 'block'
    }

    const closeStyle = {
        display: isClosed ? 'none' : 'block'
    }

    function onInputChange(e) {
        const target = e.target;
        searchParams[target.name] = target.value;
        setSearchParams({...searchParams});
    }

    function handleSearch(event) {
        event.preventDefault();
        setAttendanceSearch(searchParams);
    }

    return (
        <div className='d-flex flex-wrap'>
            <div style={{...closeStyle, backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
                <SectionHeader sTitle={'Create New/Search Attendance'} toggleCollapse={collapseButton}
                               toggleClose={closeButton}/>
                <div className='px-3' style={{...collapsableStyle}}>
                    <Form className='px-2' onSubmit={handleSearch}>
                        <Row className='d-flex flex-wrap'>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Select Class</Label>
                                <Input type='select' name='class' value={searchParams.class} onChange={onInputChange}>
                                    <option value=' '> </option>
                                    {returnClassesArray(classes).map((v,i) => {
                                        return <option key={i} value={v}>{v}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Select Class Section</Label>
                                <Input type='select' name='section' value={searchParams.section} onChange={onInputChange}>
                                    <option value=' '> </option>
                                    {returnSectionArray(classes).map((v,i) => {
                                        return <option key={i} value={v}>{v}</option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Select Year</Label>
                                <Input name='year' value={searchParams.year} onChange={onInputChange}/>
                            </FormGroup>
                            <FormGroup className='flex-fill mr-3'>
                                <Label>Select Month</Label>
                                <Input type='select' name='month' value={searchParams.month} onChange={onInputChange}>
                                    <option value={0}>January</option>
                                    <option value={1}>February</option>
                                    <option value={2}>March</option>
                                    <option value={3}>April</option>
                                    <option value={4}>May</option>
                                    <option value={5}>June</option>
                                    <option value={6}>July</option>
                                    <option value={7}>August</option>
                                    <option value={8}>September</option>
                                    <option value={9}>October</option>
                                    <option value={10}>November</option>
                                    <option value={11}>December</option>
                                </Input>
                            </FormGroup>
                        </Row>
                        <Button style={{backgroundColor: '#264d73', color: 'white'}}>Search</Button>
                    </Form>
                </div>
            </div>
        </div>
    )

}

function AttendanceTable({ma, month, year, clas, section} = {
    month: new Date().getMonth(), year: new Date().getFullYear(),
    clas: "", section: ""
}) {
    const [state, dispatch] = useContext(AppContext)
    const [updater, setUpdater] = useState(false);
    console.log("maInitial", ma)

    function isSaturdayOrSunday(year, month, i) {
        let saturday = 6;
        let sunday = 0;
        let date = new Date(year, month, i).getDay()
        return date === saturday || date === sunday;
    }

    function handleSaveAttendance(){
        async function postAttendance() {
            console.log('ma inside async,', ma)
            let action;
            await axios.post('http://localhost:8080/v1/api/post-attendance', JSON.stringify(ma))
                    .then(result => {
                        if (result.status === 200) {
                            action = {type: 'EDIT_ATTENDANCE', payload: result.data};
                            console.log('AddAttendance')
                            dispatch(action);
                        }
                    })
        }
        postAttendance();
    }

    return (
        <div className='flex-fill'
             style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    {getMonthDates(month, year).map((x, a) => {
                        return <th key={a}>{x}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {ma.map((m, x) => {
                    return <tr key={x}>
                        <td>{m.studentName}</td>
                        <td>{m.class}</td>
                        {m.attendanceSlice.map((s, i) => {

                            function handleOnClickDay() {

                                if (isSaturdayOrSunday(m.year, m.month, i + 1) !== true) {
                                    if (ma[x].attendanceSlice[i] === '1') {
                                        console.log("monthly[]", ma)
                                        //monthlyAttendance[x].attendanceSlice[i] = '1';
                                        ma[x].attendanceSlice[i] = '0';
                                        //s = '1';
                                        //atTrial.check = '1'
                                    } else {
                                        ma[x].attendanceSlice[i] = '1'
                                    }
                                }

                                setUpdater(!updater);
                            }

                            return <td onClick={() => handleOnClickDay()}>{(s === '1') ?
                                <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/> : (s === '0') ?
                                    <FontAwesomeIcon icon={faTimes} style={{color: 'red'}}/> : " "}</td>
                        })}
                    </tr>
                })}
                </tbody>
                <Button onClick={handleSaveAttendance}>SAVE</Button>
            </table>
        </div>
    )

}


function Attendance() {

    const [state, dispatch] = useContext(AppContext)

    function createClassAttendance(stud, clas, section = "", month = new Date().getMonth(), year = new Date().getFullYear()) {
        let classAttendance = [];
        let classStudents = stud.filter(s => {
            if (clas === "" && section === ""){
                return true;
            } else if (clas !== "" && section === "") {
                return (s.class === clas);
            } else {
                return (s.class === clas && s.section === section)
            }
        })
        for (let i = 0; i < classStudents.length; i++) {
            let numberOfDays = new Date(year, month, 0).getDate();
            let att = new Array(numberOfDays).fill(" ");
            let attendObject = {
                studentId: classStudents[i].admissionNumber,
                studentName: classStudents[i].firstName + " " + classStudents[i].lastName,
                class: clas,
                section: section,
                year: year,
                month: month,
                attendanceSlice: att
            }
            classAttendance.push(attendObject);
        }
        return classAttendance;
    }

    const [attendanceSearch, setAttendanceSearch] = useState({
        class: '',
        section: '',
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    });
    let {attendance, students} = state;
    let ma = attendance;
    if (attendance.length !== 0 && attendanceSearch.class !== ''){
        ma = attendance.filter(a => {
            return a.class === attendanceSearch.class && a.year === attendanceSearch.year && a.month === attendanceSearch.month;
        })
    }
    if (attendance.length !== 0 && ma.length === 0 && attendanceSearch.class !== ''){
        ma = createClassAttendance(students, attendanceSearch.class, attendanceSearch.section, attendanceSearch.month, attendanceSearch.year);
    }
    if (attendance.length === 0) {
        ma = createClassAttendance(students, attendanceSearch.class, attendanceSearch.section, attendanceSearch.month, attendanceSearch.year);
    }
    const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

    const collapsableStyle = {
        display: isCollapse ? 'none' : 'flex'
    }

    const closeStyle = {
        display: isClosed ? 'none' : 'flex'
    }

    return (
        <div className='d-block'>
            <AttendanceCheckout attendanceSearch={attendanceSearch} setAttendanceSearch={setAttendanceSearch}/>

            <div className='flex-column flex-fill px-2 my-3 shadow'
                 style={{...closeStyle, backgroundColor: 'white', width: '100%', overflowX: 'auto'}}>
                <div className='d-flex'>
                    <strong className='align-self-center'>Attendance
                        For {attendanceSearch.class + " " + attendanceSearch.section + ", " + convertMonth(attendanceSearch.month)
                        + ", " + attendanceSearch.year}</strong>
                    <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton}/>
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>

                </div>
                <hr style={{margin: '0px', backgroundColor: 'black'}}/>
                <div style={{...collapsableStyle, overflowX: 'auto'}}>
                    <AttendanceTable ma={ma} month={attendanceSearch.month} year={attendanceSearch.year}
                                     clas={attendanceSearch.class}
                                     section={attendanceSearch.section}/>
                </div>

            </div>
        </div>
    )
}


function getMonthDates(month = new Date().getMonth(), year = new Date().getFullYear()) {
    let dates = [];
    let numberOfDays = new Date(year, month, 0).getDate();
    console.log(numberOfDays)
    for (let i = 0; i < numberOfDays; i++) {
        dates.push(i + 1);
    }
    return dates;
}

function convertMonth(month) {
    month = Number(month);
    switch (month) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
        default:
            return 'Invalid Month';
    }
}


/*function AttendArray(attendanceArray, month, year) {
    let saturday = 6;
    let sunday = 0;
    let att = [];
    if (attendanceArray.length !== 0) {
        att = attendanceArray.map((a, i) => {
            let date = new Date(year, month, i).getDay()
            if (date === saturday || date === sunday) {
                return " "
            } else {
                return a
            }
        })
    } else {
        let numberOfDays = new Date(year, month, 0).getDate();
        att = new Array(numberOfDays).fill(" ")
    }

    return att;
}*/


function createIndividualAttendance(stud, clas, section = "", month = new Date().getMonth(), year = new Date().getFullYear()) {
    let numberOfDays = new Date(year, month, 0).getDate();
    let att = new Array(numberOfDays).fill(" ");
    return {
        studentId: stud.admissionNumber,
        studentName: stud.firstName + " " + stud.lastName,
        class: clas,
        section: section,
        year: year,
        month: month,
        attendanceSlice: att
    };
}

export default Attendance;