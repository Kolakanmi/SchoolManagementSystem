import React, {useState, useContext} from 'react';
import SectionHeader from '../dashboard/SectionHeader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faSync,
  faAngleDown,
  faTimes,
  faEye,
  faEdit,
  faDumpster,
  faDumpsterFire
} from '@fortawesome/free-solid-svg-icons';
import useCollapseState from '../../lib/CollapseState';
import { AppContext } from '../../contexts/AppContext';
import {Redirect} from 'react-router-dom';
import {Col, Row, FormGroup, Form, Label, Input} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import {returnClassesArray, returnSectionArray, returnSubjectsArray} from "../../lib/ReturnNeededArray";
import axios from "axios";


function GradeCheckout({gradeSearch, setGradeSearch}) {
  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState()
  const [state] = useContext(AppContext)
  const [searchParams, setSearchParams] = useState(gradeSearch);
  let {grades, subjects, classes} = state;
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
    setGradeSearch(searchParams);
  }

  return (
      <div className='d-flex flex-wrap'>
        <div style={{...closeStyle, backgroundColor: 'white'}} className='shadow mr-2 mb-4'>
          <SectionHeader sTitle={'Create New/Search Grade'} toggleCollapse={collapseButton}
                         toggleClose={closeButton}/>
          <div className='px-3' style={{...collapsableStyle}}>
            <Form className='px-2' onSubmit={handleSearch}>
              <Row className='d-flex flex-wrap'>
                <FormGroup className='flex-fill mr-3'>
                  <Label>Select Subject</Label>
                  <Input type='select' name='subject' value={searchParams.subject} onChange={onInputChange}>
                    <option value=' '> </option>
                    {returnSubjectsArray(subjects).map((v,i) => {
                      return <option key={i} value={v}>{v}</option>
                    })}
                  </Input>
                </FormGroup>
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
                  <Label>Select Year</Label>
                  <Input name='year' value={searchParams.year} onChange={onInputChange}/>
                </FormGroup>
                <FormGroup className='flex-fill mr-3'>
                  <Label>Select Term</Label>
                  <Input type='select' name='term' value={searchParams.term} onChange={onInputChange}>
                    <option value='First'>First</option>
                    <option value='Second'>Second</option>
                    <option value='Third'>Third</option>
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


function GradeTable({mg, subject, clas, term, year}) {
  const [state, dispatch] = useContext(AppContext)
  const [updater, setUpdater] = useState(false);
  const [trial, setTrial] = useState({
    classWork: 0,
    test: 0,
    exam: 0,
    assignment: 0
  })
  console.log("mgInitial", mg)

  function handleSaveGrade(){
    async function postGrade() {
      console.log('mg inside async,', mg)
      let action;
      await axios.post('http://localhost:8080/v1/api/post-grade', JSON.stringify(mg))
          .then(result => {
            if (result.status === 200) {
              action = {type: 'EDIT_GRADE', payload: result.data};
              console.log('AddGrade')
              dispatch(action);
            }
          })
    }
    postGrade();
  }

  function deleteGrade(i) {
    mg.splice(i, 1)
    setTrial({...trial})
  }

  return (
      <div className='flex-fill'
           style={{display: 'flex', overflowX: 'auto', fontSize: '0.65rem', fontWeight: 'bold'}}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Class</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Term</th>
              <th>Year</th>
              <th>ClassWork</th>
              <th>Assignment</th>
              <th>Test</th>
              <th>Exam</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          {mg.map((m, x) => {
            
            function handleChange(x, event) {
              trial[event.target.name] = event.target.value;
              mg[x][event.target.name] = Number(trial[event.target.name])
              mg[x].total = (Number(mg[x].classWork) + Number(mg[x].assignment) + Number(mg[x].test) + Number(mg[x].exam))
              setTrial({...trial})
              //mg[x][event.target.name] = trial[event.target.name]
              console.log(mg)

            }
            
            return <tr key={x}>
              <td>{m.class}</td>
              <td>{m.studentName}</td>
              <td>{m.subject}</td>
              <td>{m.term}</td>
              <td>{m.year}</td>
              <td><Input name='classWork' bsSize='sm' value={m.classWork} onChange={(event) => handleChange(x, event)}/></td>
              <td><Input name='assignment' bsSize='sm' value={m.assignment} onChange={(event) => handleChange(x, event)}/></td>
              <td><Input name='test' bsSize='sm' value={m.test} onChange={(event) => handleChange(x, event)}/></td>
              <td><Input name='exam' bsSize='sm' value={m.exam} onChange={(event) => handleChange(x, event)}/></td>
              <td style={{fontSize: '1.5rem'}}>{m.total}</td>
              <td><FontAwesomeIcon icon={faDumpster} style={{color: 'red'}} onClick={() => deleteGrade(x)}/></td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
  )

}

function Grades() {
  const [state, dispatch] = useContext(AppContext)
  function createClassGradesBySubject(stud, sub, clas, term, year = new Date().getFullYear()) {
    let subjectGrade = [];
    let classStudents = stud.filter(s => {
      if (clas === "" && sub === ""){
        return true;
      } else if (clas === "" && sub !== ""){
        return true;
      }else {
        return (s.class === clas)
      }
    });
    for (let i = 0; i < classStudents.length; i++) {
      let gradeObject = {
        subject: sub,
        studentId: classStudents[i].admissionNumber,
        studentName: classStudents[i].firstName + " " + classStudents[i].lastName,
        class: clas,
        term: term,
        year: year,
        classWork: 0,
        assignment: 0,
        test: 0,
        exam: 0,
        total: 0,
      }
      subjectGrade.push(gradeObject)
    }
    return subjectGrade;
  }

  function getCurrentTerm() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    if (currentMonth >= 7) {
      return "First"
    } else if (currentMonth >= 0 && currentMonth < 3) {
      return "Second"
    } else {
      return "Third"
    }
  }

  const [gradeSearch, setGradeSearch] = useState({
    class: '',
    subject: '',
    year: new Date().getFullYear(),
    term: getCurrentTerm()
  })

  let {grades, students} = state;
  let mg = grades;
  if (grades.length !== 0 && gradeSearch.class !== '') {
    mg = grades.filter(g => {
      return g.class === gradeSearch.class && g.year === gradeSearch.year && g.term === gradeSearch.term && g.subject === gradeSearch.subject;
    })
  }
  if (grades.length !== 0 && mg.length === 0 && gradeSearch.subject !== '' && gradeSearch.class !== '') {
    mg = createClassGradesBySubject(students, gradeSearch.subject, gradeSearch.class, gradeSearch.term, gradeSearch.year)
  }
  if (grades.length === 0) {
    mg = createClassGradesBySubject(students, gradeSearch.subject, gradeSearch.class, gradeSearch.term, gradeSearch.year)
  }

  const [isCollapse, collapseButton, isClosed, closeButton] = useCollapseState();

  const collapsableStyle = {
    display: isCollapse ? 'none' : 'flex'
  }

  const closeStyle = {
    display: isClosed ? 'none' : 'flex'
  }

  return(
      <div className='d-block px-2'>
        <GradeCheckout gradeSearch={gradeSearch} setGradeSearch={setGradeSearch}/>
        <div className='flex-column flex-fill px-2 my-3 shadow'
             style={{...closeStyle, backgroundColor: 'white', width: '100%', overflowX: 'auto'}}>
          <div className='d-flex'>
            <strong className='align-self-center'>Grade
              For {gradeSearch.subject + " " + gradeSearch.class + ", " + gradeSearch.term
              + ", " + gradeSearch.year}</strong>
            <span className='ml-auto align-self-center flex-wrap'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} onClick={collapseButton}/>
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}} onClick={closeButton}/>
        </span>

          </div>
          <hr style={{margin: '0px', backgroundColor: 'black'}}/>
          <div style={{...collapsableStyle, overflowX: 'auto'}}>
            <GradeTable mg={mg} year={gradeSearch.year} term={gradeSearch.term} subject={gradeSearch.subject} clas={gradeSearch.class}/>
          </div>

        </div>
      </div>
  )
}

export default Grades;