import React, {createContext, useReducer} from 'react';
import useCombinedReducer from '../reducers/useCombinedReducer';
import studentReducer from '../reducers/StudentReducer';
import parentReducer from '../reducers/ParentReducer';
import teacherReducer from '../reducers/TeacherReducer';
import attendanceReducer from '../reducers/AttendanceReducer';
import libraryReducer from '../reducers/LibraryReducer';
import classReducer from '../reducers/ClassReducer';
import subjectReducer from '../reducers/SubjectReducer';
import routineReducer from '../reducers/RoutineReducer';
import examReducer from '../reducers/ExamReducer';
import transportReducer from '../reducers/TransportReducer';
import hostelReducer from '../reducers/HostelReducer';
import noticeReducer from '../reducers/NoticeReducer';
import messageReducer from '../reducers/MessageReducer';
import profileReducer from '../reducers/ProfileReducer';
import gradeReducer from '../reducers/GradeReducer';
import feeReducer from "../reducers/FeeReducer";
import expenseReducer from "../reducers/ExpenseReducer";


/* const combinedReducer = {
  student: useReducer(studentReducer, {})
} */


export const AppContext = createContext();

export function AppProvider(props) {

    const [state, dispatch] = useCombinedReducer({
        students: useReducer(studentReducer, []),
        parents: useReducer(parentReducer, []),
        teachers: useReducer(teacherReducer, []),
        books: useReducer(libraryReducer, []),
        fees: useReducer(feeReducer, []),
        expenses: useReducer(expenseReducer, []),
        classes: useReducer(classReducer, []),
        subjects: useReducer(subjectReducer, []),
        grades: useReducer(gradeReducer, []),
        routine: useReducer(routineReducer, []),
        attendance: useReducer(attendanceReducer, []),
        exams: useReducer(examReducer, []),
        transport: useReducer(transportReducer, []),
        hostels: useReducer(hostelReducer, []),
        notice: useReducer(noticeReducer, []),
        messages: useReducer(messageReducer, []),
        profile: useReducer(profileReducer, {})
    });


    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
}