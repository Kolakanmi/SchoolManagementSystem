import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faSync, faTimes} from '@fortawesome/free-solid-svg-icons'
import ExamResultTable from './ExamResultTable';

var examresult = [
  {
    id: 1,
    name: 'Exam',
    position: 1,
    percent: 98,
    subject: 'Mathematics',
    session: '2011/2012',
    term: 'First'
  }
];


function ExamResult(){

  return(
    <div className='flex-fill px-2 my-3 shadow' style={{backgroundColor: 'white', width: '100%', maxHeight: '300px'}}>
      <div className='d-flex py-1'>
        <strong>Exam Result</strong>
        <div className='d-flex ml-auto'>
          <input className='flex-fill form-control form-control-sm mx-1' style={{maxHeight: '25px'}}/>
          <button type='button' className='mx-1' style={{maxHeight: '25px', fontSize: '0.8rem'}}>Search</button>
        </div>
        <span className='ml-auto'>
          <FontAwesomeIcon icon={faAngleDown} className='ml-2' style={{color: '#ff9900'}} />
          <FontAwesomeIcon icon={faSync} className='ml-2' size='sm' style={{color: 'green'}}/>
          <FontAwesomeIcon icon={faTimes} className='ml-2' size='sm' style={{color: 'red'}}/>
        </span>
      </div>
      <hr style={{margin:'0px', backgroundColor: 'black'}}/>
      <ExamResultTable allExams={examresult}/>
      
    </div>
  );
}

export default ExamResult;