import React, {useContext} from 'react';
import {AppContext} from "../../contexts/AppContext";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function GradeViewForParents() {
    
    const [state, dispatch] = useContext(AppContext);
    let {grades, profile} = state;

    return(
        <div className='d-flex flex-column'>
            {profile.details.children.map((c, i) => {
                return <div className='flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%', border: '2px grey solid'}} key={i}>
                    <h4>{c.firstName}</h4>
                    <hr/>
                    <ChildGradeTable childGrades={filterGradesByStudentId(grades, c.admissionNumber)}/>
                </div>
            })}
        </div>
    )
    
}

function filterGradesByStudentId(grades, childId) {
    return grades.filter((g) => {
        return g.studentId !== "" && g.studentId === childId
    });
}

function ChildGradeTable({childGrades}) {

    return(
        <div className='flex-fill' style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
            <table className='table table-bordered'>
                <thead>
                <tr>
                    <th>Subject</th>
                    <th>Class</th>
                    <th>Year</th>
                    <th>Term</th>
                    <th>Class Work</th>
                    <th>Assignment</th>
                    <th>Test</th>
                    <th>Exam</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {childGrades.map(g => {return <tr key={g.subject+g.total+g.term}>
                    <td>{g.subject}</td>
                    <td>{g.class}</td>
                    <td>{g.year}</td>
                    <td>{g.term}</td>
                    <td>{g.classWork} </td>
                    <td>{g.assignment}</td>
                    <td>{g.test}</td>
                    <td>{g.exam}</td>
                    <td>{g.total}</td>
                </tr>})}
                </tbody>
            </table>
        </div>
    );
}

export default GradeViewForParents;