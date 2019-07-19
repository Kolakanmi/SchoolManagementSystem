import React from 'react';
import {Route, Switch} from 'react-router-dom';
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

function RouterView(props){

  return(
    <div className='px-sm-3 py-4'>
      <Switch>
        <Route exact path='/dashboard' component= {Dashboard}/>
        <Route path='/dashboard/student' component= {StudentsDashboard}/>
        <Route path='/dashboard/parent' component= {ParentsDashboard}/>
        <Route path='/students/all-students' component= {AllStudents}/>
        <Route path='/students/student-details/:id' render={
          ({match}) => {
            if (match.params.id)
            return(<StudentDetails/>)
          }
        }/>
        <Route path='/students/add-student' component={AddStudent}/>
        <Route path='/students/student-promotion' component={StudentPromotion}/>
        <Route path='/teachers/all-teachers' component={AllTeachers}/>
        <Route path='/teachers/teacher-details' component={TeacherDetails}/>
        <Route path='/teachers/add-teacher' component={AddTeacher}/>
        <Route path='/parents' component={AllParents}/>
        <Route path='/library/all-books' component={AllBooks}/>
        <Route path='/library/add-book' component={AddBook}/>
        <Route path='/finance/fees' component={Fees}/>
        <Route path='/finance/other-earnings' component={OtherEarnings}/>
        <Route path='/finance/create-fees-payment' component={CreateFeesPayment}/>
        <Route path='/finance/all-expenses' component={AllExpenses}/>
        <Route path='/finance/add-expense' component={AddExpense}/>
        <Route path='/class/add-class' component={AddClass}/>
        <Route path='/class/all-classes' component={AllClasses}/>
        <Route path='/subjects/all-subjects' component={Subjects}/>
        <Route path='/exams/grades' component={Grades}/>
        <Route path='/transport' component={Transport}/>
        <Route path='/hostel' component={Hostel}/>
        <Route path='/notice' component={Notice}/>
        <Route path='/profile' component={Profile}/>
      </Switch>
    </div>
  );
}

export default RouterView;