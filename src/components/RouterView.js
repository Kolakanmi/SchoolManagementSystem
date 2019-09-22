import React, {useEffect, useContext} from 'react';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import StudentsDashboard from './dashboard/StudentsDashboard';
import ParentsDashboard from './dashboard/ParentsDashboard';
import AllStudents from './students/AllStudents';
import StudentDetails from './students/StudentDetails';
import AddStudent from './students/AddStudent';
import StudentPromotion from './students/StudentPromotion';
import AllTeachers from './teachers/AllTeachers';
import TeacherDetails from './teachers/TeacherDetails';
import AddTeacher from './teachers/AddTeacher';
import AllParents from './parents/AllParents';
import AllBooks from './library/AllBooks';
import AddBook from './library/AddBook';
import Fees from './finance/Fees';
import OtherEarnings from './finance/OtherEarnings';
import CreateFeesPayment from './finance/CreateFeesPayment';
import AllExpenses from './finance/AllExpenses';
import AddExpense from './finance/AddExpense';
import AddClass from './class/AddClass';
import AllClasses from './class/AllClasses';
import Subjects from './subjects/Subjects';
import Grades from './exams/Grades';
import Transport from './transport/Transport';
import Hostel from './hostel/Hostel';
import Notice from './notice/Notice';
import Profile from './profile/Profile';
import LoginPage from './Login';
import {AppContext} from '../contexts/AppContext';
import axios from 'axios'
import Attendance from "./attendance/Attendance";
import PrivateRoute from "./PrivateRoute";
import Sidebar from "./Sidebar";

function RouterView({isOpen, setIsOpen}) {


    return (
        <div className='px-sm-3 py-4' onClick={() => {
            if (isOpen === true) {
              setIsOpen(!isOpen)
            }
        }}>

                <Route exact path='/' component={Dashboard}/>
                <Route exact path='/dashboard' component={Dashboard}/>
                <Route exact path='/dashboard/student' component={StudentsDashboard}/>
                <Route exact path='/dashboard/parent' component={ParentsDashboard}/>
                <Route exact path='/students/all-students' component={AllStudents}/>
                <Route exact path='/students/student-details/:id' component={StudentDetails}/>
                <Route exact path='/students/add-student' component={AddStudent}/>
                <Route exact path='/students/edit-student/:id' component={AddStudent}/>
                <Route exact path='/students/student-promotion' component={StudentPromotion}/>
                <Route exact path='/teachers/all-teachers' component={AllTeachers}/>
                <Route exact path='/teachers/teacher-details/:id' component={TeacherDetails}/>
                <Route exact path='/teachers/add-teacher' component={AddTeacher}/>
                <Route exact path='/teachers/edit-teacher/:id' component={AddTeacher}/>
                <Route exact path='/parents' component={AllParents}/>
                <Route exact path='/library/add-book' component={AddBook}/>
                <Route exact path='/library/edit-book/:id' component={AddBook}/>
                <Route exact path='/attendance' component={Attendance}/>
                <Route exact path='/finance/fees' component={Fees}/>
                <Route exact path='/finance/other-earnings' component={OtherEarnings}/>
                <Route exact path='/finance/create-fees-payment' component={CreateFeesPayment}/>
                <Route exact path='/finance/all-expenses' component={AllExpenses}/>
                <Route exact path='/finance/add-expense' component={AddExpense}/>
                <Route exact path='/class/add-class' component={AddClass}/>
                <Route exact path='/subjects/all-subjects' component={Subjects}/>
                <Route exact path='/exams/grades' component={Grades}/>
                <Route exact path='/transport' component={Transport}/>
                <Route exact path='/hostel' component={Hostel}/>
                <Route exact path='/notice' component={Notice}/>
                <Route exact path='/profile' component={Profile}/>
                {/*<Route path='/login' component={LoginPage}/>*/}

        </div>
    );
}

export default RouterView;