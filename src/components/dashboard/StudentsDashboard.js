import React from 'react';
import StudFeesExamDoc from './StudFeesExamDoc';
import StudentInfoSummary from './StudentInfoSummary';
import NoticeBoard from './NoticeBoard';
import ExamResult from './ExamResult';

function StudentsDashboard(props) {

  return(
    <div>
      <StudFeesExamDoc/>
      <div className='d-flex flex-wrap'>
        <StudentInfoSummary/>
        <div className='d-flex flex-column flex-fill' style={{display: 'flex', overflowX: 'auto'}}>
          <NoticeBoard/>
          <ExamResult/>
        </div>
      
      </div>
    </div>
  );
}

export default StudentsDashboard;